import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
import { Dashboard } from './pages/dashboard/dashboard';
import { Department } from './pages/department/department';
import { Employee } from './pages/employee/employee';
import { Salary } from './pages/salary/salary';
import { Payroll } from './pages/payroll/payroll';
import { authGuard } from './guards/auth.guard';

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
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'employees', component: Employee },
      { path: 'salary', component: Salary },
      { path: 'payroll', component: Payroll },
      { path: 'departments', component: Department },
    ],
  },

  // 🔹 Fallback
  {
    path: '**',
    redirectTo: 'login',
  },
];
