import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayrollService } from '../../../services/payroll';
import { EmployeeService } from '../../../services/employee';
import { EmployeeListModel } from '../../../models/EmployeeList.model';
import { PayrollReportModel, EmployeeSlipModel } from '../../../models/Payroll.model';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payroll.html',
  styleUrl: './payroll.css',
})
export class Payroll {
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  selectedEmployeeId: number | null = null;

  payrollReport = signal<PayrollReportModel | null>(null);
  employeeSlip = signal<EmployeeSlipModel | null>(null);
  employeeList = signal<EmployeeListModel[]>([]);

  private payrollService = inject(PayrollService);
  private employeeService = inject(EmployeeService);

  constructor() {
    this.loadEmployees();
  }

  loadEmployees() {
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

  slipMonth = new Date().getMonth() + 1;
  slipYear = new Date().getFullYear();

  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  generatePayroll() {
    this.payrollService.generatePayroll(this.month, this.year).subscribe({
      next: (res) => alert(res),
    });
  }

  loadReport() {
    this.payrollService
      .getReport(this.month, this.year)
      .subscribe((res) => this.payrollReport.set(res));
  }

  loadEmployeeSlip() {
    if (!this.selectedEmployeeId) return;

    this.payrollService
      .getEmployeeSlip(this.selectedEmployeeId!, this.slipMonth, this.slipYear)
      .subscribe({
        next: (res) => this.employeeSlip.set(res),
        error: () => alert('Payroll not generated for selected month.'),
      });
  }
}
