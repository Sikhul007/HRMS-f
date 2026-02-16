import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
import { Dashboard } from './pages/dashboard/dashboard';
import { EmployeeList } from './pages/employee-list/employee-list';
import { EmployeeForm } from './pages/employee-form/employee-form';
import { Department } from './pages/department/department';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Header,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'new-employees',
        component: EmployeeForm,
      },
      {
        path: 'employees',
        component: EmployeeList,
      },
      {
        path: 'departments',
        component: Department,
      },
      {
        path: 'new-department',
        component: Department,
      },
    ],
  },
];
