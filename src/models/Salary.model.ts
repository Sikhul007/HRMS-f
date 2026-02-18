export class SalaryModel {
  employeeId: number;
  basicSalary: number;
  allowance: number;
  bonus: number;
  deduction: number;
  effectiveFrom: string;

  constructor() {
    this.employeeId = 0;
    this.basicSalary = 0;
    this.allowance = 0;
    this.bonus = 0;
    this.deduction = 0;
    this.effectiveFrom = '';
  }
}
