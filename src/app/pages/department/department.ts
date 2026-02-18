import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentModel } from '../../../models/Department.model';
import { Master } from '../../../services/department';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  newDeptObj: DepartmentModel = new DepartmentModel();
  deptList = signal<DepartmentModel[]>([]);
  editId: number | null = null;

  private masterService = inject(Master);

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe({
      next: (result: DepartmentModel[]) => {
        this.deptList.set(result);
      },
      error: () => alert('Failed to load departments'),
    });
  }

  onSubDeptForm() {
    if (this.editId !== null) {
      this.masterService.updateDepartment(this.editId, this.newDeptObj).subscribe({
        next: () => {
          alert('Department updated successfully');
          this.resetForm();
          this.getAllDepartments();
        },
        error: () => alert('Update failed'),
      });
    } else {
      this.masterService.addDepartment(this.newDeptObj).subscribe({
        next: () => {
          alert('Department added successfully');
          this.resetForm();
          this.getAllDepartments();
        },
        error: () => alert('Create failed'),
      });
    }
  }

  onEdit(dept: DepartmentModel) {
    this.editId = dept.id;
    this.newDeptObj = { ...dept };
  }

  onDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    this.masterService.deleteDepartment(id).subscribe({
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
