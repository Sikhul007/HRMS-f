import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
import { Dashboard } from './pages/dashboard/dashboard';
import { Department } from './pages/department/department';
import { Employee } from './pages/employee/employee';
import { Salary } from './pages/salary/salary';
import { Payroll } from './pages/payroll/payroll';

export const routes: Routes = [
  // 🔹 Default
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // 🔹 Auth
  {
    path: 'login',
    component: Login,
  },

  // 🔹 App layout
  {
    path: '',
    component: Header,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      // Employees
      {
        path: 'employees',
        component: Employee,
      },

      // Salary
      {
        path: 'salary',
        component: Salary,
      },

      // paytoll
      {
        path: 'payroll',
        component: Payroll,
      },

      // Departments
      {
        path: 'departments',
        component: Department,
      },
      {
        path: 'departments/new',
        component: Department,
      },
      {
        path: 'departments/edit/:id',
        component: Department,
      },
    ],
  },

  // 🔹 Fallback
  {
    path: '**',
    redirectTo: 'login',
  },
];
