// frontend/src/app/employees/employee-detail/employee-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // สำหรับ *ngIf และ Pipes (เช่น DatePipe, CurrencyPipe)
import { ActivatedRoute, Router } from '@angular/router'; // สำหรับดึง ID จาก URL และการนำทาง
import { EmployeeService, Employee } from '../../services/employee.service'; // นำเข้า Service

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule], // CommonModule จำเป็นสำหรับ *ngIf
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined; // ตัวแปรสำหรับเก็บข้อมูลพนักงาน

  constructor(
    private route: ActivatedRoute, // สำหรับอ่าน parameter จาก URL
    private employeeService: EmployeeService,
    private router: Router // สำหรับการนำทาง
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // ดึง 'id' จาก URL
      if (id) {
        this.employeeService.getEmployee(+id).subscribe({ // +id แปลง string เป็น number
          next: (data) => {
            this.employee = data;
          },
          error: (err) => {
            console.error('Error fetching employee details:', err);
            // หากหาไม่เจอ หรือเกิด Error ให้กลับไปหน้ารายการ
            this.router.navigate(['/employees']);
          }
        });
      } else {
        // หากไม่มี ID ใน URL ก็กลับไปหน้ารายการ
        this.router.navigate(['/employees']);
      }
    });
  }

  // เมธอดสำหรับนำทางไปยังหน้าแก้ไข
  editEmployee(): void {
    if (this.employee?.id) {
      this.router.navigate(['/employees/edit', this.employee.id]);
    }
  }

  // เมธอดสำหรับกลับไปหน้ารายการ
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}