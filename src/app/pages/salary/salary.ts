import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalaryModel } from '../../../models/Salary.model';
import { SalaryService } from '../../../services/salary';
import { EmployeeService } from '../../../services/employee';
import { EmployeeListModel } from '../../../models/EmployeeList.model';
import { SalaryHistoryModel } from '../../../models/SalaryHistory.model';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salary.html',
  styleUrl: './salary.css',
})
export class Salary implements OnInit {
  newSalary = new SalaryModel();

  employeeList = signal<EmployeeListModel[]>([]);
  salaryHistory = signal<SalaryHistoryModel[]>([]);
  currentSalary = signal<any | null>(null);

  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    // Get first 100 employees for dropdown
    this.employeeService
      .getAllEmployees({
        Search: '',
        DepartmentId: null,
        Status: null,
        PageNumber: 1,
        PageSize: 100,
      })
      .subscribe((res) => {
        this.employeeList.set(res.data ?? res.Data ?? []);
      });
  }

  onEmployeeChange() {
    if (!this.newSalary.employeeId) return;

    this.salaryService
      .getHistory(this.newSalary.employeeId)
      .subscribe((res) => this.salaryHistory.set(res));

    this.salaryService
      .getCurrent(this.newSalary.employeeId)
      .subscribe((res) => this.currentSalary.set(res));
  }

  onSubmit() {
    this.salaryService.createSalary(this.newSalary).subscribe({
      next: () => {
        alert('Salary created successfully');
        this.onEmployeeChange();
        this.newSalary = new SalaryModel();
      },
    });

    this.salaryService
      .getHistory(this.newSalary.employeeId)
      .subscribe((res: SalaryHistoryModel[]) => {
        this.salaryHistory.set(res);
      });
  }
}
