// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' }, // เมื่อเข้าสู่ root path ให้ redirect ไป /employees
  { path: 'employees', component: EmployeeListComponent }, // แสดงรายการพนักงาน
  { path: 'employees/new', component: EmployeeFormComponent }, // ฟอร์มสำหรับเพิ่มพนักงานใหม่
  { path: 'employees/:id', component: EmployeeDetailComponent }, // แสดงรายละเอียดพนักงานตาม ID
  { path: 'employees/edit/:id', component: EmployeeFormComponent }, // ฟอร์มแก้ไขพนักงานตาม ID
  { path: '**', redirectTo: '/employees' } // ถ้าเข้า URL ที่ไม่รู้จัก ให้ redirect กลับไปที่ /employees
];