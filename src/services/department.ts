import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DepartmentModel } from '../models/Department.model';

@Injectable({
  providedIn: 'root',
})
export class Master {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7020/api/Department';

  getAllDepartments() {
    return this.http.get<DepartmentModel[]>(this.apiUrl);
  }

  addDepartment(data: DepartmentModel) {
    return this.http.post(this.apiUrl, data, {
      responseType: 'text',
    });
  }

  updateDepartment(id: number, data: DepartmentModel) {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      responseType: 'text',
    });
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text',
    });
  }
}
