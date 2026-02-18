// export interface SalaryHistoryModel {
//   id: number;
//   basicSalary: number;
//   allowance: number;
//   bonus: number;
//   deduction: number;
//   netSalary: number;
//   effectiveFrom: string;
// }

export interface SalaryHistoryModel {
  id: number;
  basicSalary: number;
  allowance: number;
  bonus: number;
  deduction: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isActive: boolean;
  totalSalary: number;
}
