import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SalaryModel } from '../models/Salary.model';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7020/api/Salary';

  createSalary(data: SalaryModel) {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }

  getHistory(employeeId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${employeeId}`);
  }

  getCurrent(employeeId: number) {
    return this.http.get<any>(`${this.apiUrl}/current/${employeeId}`);
  }
}
