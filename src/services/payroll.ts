import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PayrollReportModel, EmployeeSlipModel } from '../models/Payroll.model';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7020/api/Payroll';

  generatePayroll(month: number, year: number) {
    return this.http.post(`${this.apiUrl}/generate`, { month, year }, { responseType: 'text' });
  }

  getReport(month: number, year: number) {
    const params = new HttpParams().set('month', month).set('year', year);

    return this.http.get<PayrollReportModel>(`${this.apiUrl}/report`, { params });
  }

  getEmployeeSlip(employeeId: number, month: number, year: number) {
    const params = new HttpParams()
      .set('employeeId', employeeId)
      .set('month', month)
      .set('year', year);

    return this.http.get<EmployeeSlipModel>(`${this.apiUrl}/employee-slip`, { params });
  }
}
