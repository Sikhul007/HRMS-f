import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentModel } from '../../../models/Department.model';
import { Master } from '../../../services/master';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  newDeptObj: DepartmentModel = new DepartmentModel();
  deptList: DepartmentModel[] = [];
  editId: number | null = null;

  masterservice = inject(Master);

  ngOnInit(): void {
    this.getAllDepartments();
  }

  onSubDeptForm() {
    if (this.editId) {
      this.masterservice.updateDepartment(this.editId, this.newDeptObj).subscribe({
        next: () => {
          alert('Department added successfully');
          this.resetForm();
          this.getAllDepartments();
        },
        error: () => alert('Update failed'),
      });
    } else {
      this.masterservice.addDepartment(this.newDeptObj).subscribe({
        next: () => {
          alert('Department added successfully');
          this.resetForm();
          this.getAllDepartments();
        },
        error: () => alert('Create failed'),
      });
    }
  }

  getAllDepartments() {
    this.masterservice.getAllDepartments().subscribe({
      next: (result: any) => {
        this.deptList = result;
      },
    });
  }

  onEdit(dept: DepartmentModel) {
    this.editId = dept.id;
    this.newDeptObj = { ...dept };
  }

  onDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    this.masterservice.deleteDepartment(id).subscribe({
      next: () => {
        alert('Department deleted successfully');
        this.getAllDepartments();
      },
      error: () => alert('Delete failed'),
    });
  }

  resetForm() {
    this.newDeptObj = new DepartmentModel();
    this.editId = null;
  }
}
