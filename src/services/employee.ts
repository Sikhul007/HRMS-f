import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeModel } from '../models/Employee.model';
// import { EmployeeModel } from '../models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7020/api/Employee';

  getAllEmployees(query: any) {
    let params = new HttpParams();

    Object.keys(query).forEach((key) => {
      if (query[key] !== null && query[key] !== undefined) {
        params = params.set(key, query[key]);
      }
    });

    return this.http.get<any>(this.apiUrl, { params });
  }

  getById(id: number) {
    return this.http.get<EmployeeModel>(`${this.apiUrl}/${id}`);
  }

  addEmployee(data: EmployeeModel) {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }

  updateEmployee(id: number, data: EmployeeModel) {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      responseType: 'text',
    });
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
