export class EmployeeModel {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: number;
  position: string;
  accountNumber: string;
  employmentStatus: number;
  joiningDate: string;

  constructor() {
    this.id = 0;
    this.employeeCode = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.departmentId = 0;
    this.position = '';
    this.accountNumber = '';
    this.employmentStatus = 1;
    this.joiningDate = '';
  }
}
