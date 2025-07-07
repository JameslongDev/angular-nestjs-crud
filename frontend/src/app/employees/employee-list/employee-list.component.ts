// frontend/src/app/employees/employee-list/employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // สำหรับ *ngFor, *ngIf
import { Router, RouterLink } from '@angular/router'; // สำหรับการนำทางและ routerLink
import { EmployeeService, Employee } from '../../services/employee.service'; // นำเข้า EmployeeService และ Interface

@Component({
  selector: 'app-employee-list',
  standalone: true, // กำหนดให้เป็น Standalone Component
  imports: [CommonModule, RouterLink], // นำเข้าโมดูลที่จำเป็น
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = []; // ตัวแปรสำหรับเก็บรายการพนักงาน

  constructor(
    private employeeService: EmployeeService, // Inject EmployeeService
    private router: Router // Inject Router สำหรับการนำทาง
  ) { }

  ngOnInit(): void {
    this.loadEmployees(); // เมื่อ Component โหลด ให้ดึงข้อมูลพนักงาน
  }

  // เมธอดสำหรับโหลดข้อมูลพนักงานจาก Service
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        // เพิ่มการจัดการ Error เช่น แสดงข้อความให้ผู้ใช้เห็น
      }
    });
  }

  // เมธอดสำหรับการนำทางไปยังหน้าแก้ไขพนักงาน
  editEmployee(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/employees/edit', id]);
    }
  }

  // เมธอดสำหรับการลบพนักงาน
  deleteEmployee(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log('Employee deleted successfully!');
          this.loadEmployees(); // โหลดรายการพนักงานใหม่หลังจากลบ
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          // เพิ่มการจัดการ Error
        }
      });
    }
  }
}