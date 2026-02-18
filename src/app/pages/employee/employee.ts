import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee';
import { Master } from '../../../services/department';
import { DepartmentModel } from '../../../models/Department.model';
import { EmployeeModel } from '../../../models/Employee.model';
import { EmployeeListModel } from '../../../models/EmployeeList.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  newEmpObj: EmployeeModel = new EmployeeModel();

  empList = signal<EmployeeListModel[]>([]);
  totalCount = signal<number>(0);

  deptList = signal<DepartmentModel[]>([]);
  editId: number | null = null;

  private employeeService = inject(EmployeeService);
  private masterService = inject(Master);

  ngOnInit(): void {
    this.getAllDepartments();
    this.getAllEmployees();
  }

  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe({
      next: (res) => this.deptList.set(res),
    });
  }

  // getAllEmployees() {
  //   this.employeeService.getAllEmployees(this.query).subscribe({
  //     next: (res) => {
  //       this.empList.set(res.data);
  //       this.totalCount.set(res.totalCount);
  //     },
  //     error: () => alert('Failed to load employees'),
  //   });
  // }

  query = {
    Search: '',
    DepartmentId: null as number | null,
    Status: null as number | null,
    PageNumber: 1,
    PageSize: 5,
  };

  getAllEmployees() {
    this.employeeService.getAllEmployees(this.query).subscribe({
      next: (res) => {
        this.empList.set(res.data ?? res.Data ?? []);
        this.totalCount.set(res.totalCount ?? res.TotalCount ?? 0);
      },
    });
  }

  onSearch() {
    this.query.PageNumber = 1;
    this.getAllEmployees();
  }

  changePage(page: number) {
    this.query.PageNumber = page;
    this.getAllEmployees();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount() / this.query.PageSize);
  }

  onSubmit() {
    if (this.editId !== null) {
      this.employeeService.updateEmployee(this.editId, this.newEmpObj).subscribe({
        next: () => {
          alert('Employee updated successfully');
          this.resetForm();
          this.getAllEmployees();
        },
      });
    } else {
      this.employeeService.addEmployee(this.newEmpObj).subscribe({
        next: () => {
          alert('Employee created successfully');
          this.resetForm();
          this.getAllEmployees();
        },
      });
    }
  }

  onEdit(emp: EmployeeListModel) {
    this.employeeService.getById(emp.id).subscribe({
      next: (res) => {
        this.editId = res.id;
        this.newEmpObj = res;
      },
    });
  }

  onDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully');
        this.getAllEmployees();
      },
    });
  }

  resetForm() {
    this.newEmpObj = new EmployeeModel();
    this.editId = null;
  }
}
