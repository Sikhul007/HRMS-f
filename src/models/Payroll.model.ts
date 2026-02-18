export interface PayrollItemModel {
  employeeId: number;
  employeeName: string;
  basicSalary: number;
  allowance: number;
  bonus: number;
  deduction: number;
  tax: number;
  netSalary: number;
  status: number;
}

export interface PayrollReportModel {
  month: number;
  year: number;
  totalEmployees: number;
  totalNetSalary: number;
  totalTax: number;
  payrolls: PayrollItemModel[];
}

export interface EmployeeSlipModel {
  employee: string;
  month: number;
  year: number;
  grossSalary: number;
  deduction: number;
  tax: number;
  netSalary: number;
  status: number;
}
