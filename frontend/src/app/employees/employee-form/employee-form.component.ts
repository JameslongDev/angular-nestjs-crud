// frontend/src/app/employees/employee-form/employee-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // สำหรับ *ngIf, *ngFor
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // สำหรับ Reactive Forms
import { ActivatedRoute, Router } from '@angular/router'; // สำหรับดึง ID จาก URL และการนำทาง
import { EmployeeService, Employee } from '../../services/employee.service'; // นำเข้า Service

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ต้องมี ReactiveFormsModule
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup; // ตัวแปรสำหรับ Reactive Form
  isEditMode: boolean = false; // ตรวจสอบว่าเป็นโหมดแก้ไขหรือเพิ่มใหม่
  employeeId: number | null = null; // เก็บ ID พนักงานในโหมดแก้ไข

  constructor(
    private fb: FormBuilder, // Inject FormBuilder
    private employeeService: EmployeeService,
    private route: ActivatedRoute, // สำหรับอ่าน parameter จาก URL
    private router: Router // สำหรับการนำทาง
  ) { }

  ngOnInit(): void {
    this.initForm(); // เริ่มต้นสร้าง Form

    // ตรวจสอบว่ามี ID ใน URL หรือไม่ (โหมดแก้ไข)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id; // แปลง string เป็น number
        this.isEditMode = true;
        this.loadEmployeeData(this.employeeId); // ดึงข้อมูลพนักงานมาใส่ในฟอร์ม
      }
    });
  }

  // เมธอดสำหรับสร้างโครงสร้าง Form
  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // ตรวจสอบรูปแบบอีเมล
      phoneNumber: [''],
      hireDate: ['', Validators.required],
      jobTitle: [''],
      salary: ['', [Validators.required, Validators.min(0)]], // เงินเดือนต้องเป็นตัวเลขบวก
      department: ['']
    });
  }

  // เมธอดสำหรับดึงข้อมูลพนักงานมาใส่ในฟอร์มในโหมดแก้ไข
  loadEmployeeData(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        // ตั้งค่าค่าในฟอร์มจากข้อมูลที่ดึงมา
        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          hireDate: this.formatDate(employee.hireDate), // ฟอร์แมตวันที่ให้ถูกต้อง
          jobTitle: employee.jobTitle,
          salary: employee.salary,
          department: employee.department
        });
      },
      error: (err) => {
        console.error('Error loading employee data:', err);
        // นำทางกลับหากหาพนักงานไม่เจอ
        this.router.navigate(['/employees']);
      }
    });
  }

  // เมธอดสำหรับจัดการการ Submit Form
  onSubmit(): void {
    if (this.employeeForm.valid) { // ตรวจสอบความถูกต้องของฟอร์ม
      const employee: Employee = this.employeeForm.value;

      if (this.isEditMode && this.employeeId !== null) {
        // โหมดแก้ไข
        this.employeeService.updateEmployee(this.employeeId, employee).subscribe({
          next: () => {
            console.log('Employee updated successfully!');
            this.router.navigate(['/employees']); // กลับไปหน้ารายการ
          },
          error: (err) => {
            console.error('Error updating employee:', err);
          }
        });
      } else {
        // โหมดเพิ่มใหม่
        this.employeeService.createEmployee(employee).subscribe({
          next: () => {
            console.log('Employee created successfully!');
            this.router.navigate(['/employees']); // กลับไปหน้ารายการ
          },
          error: (err) => {
            console.error('Error creating employee:', err);
          }
        });
      }
    } else {
      // ถ้าฟอร์มไม่ถูกต้อง
      console.log('Form is invalid. Please check the fields.');
      this.employeeForm.markAllAsTouched(); // แสดงข้อความ error ให้ผู้ใช้เห็น
    }
  }

  // เมธอดช่วยในการฟอร์แมตวันที่สำหรับ input type="date"
  private formatDate(date: string | Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  // เมธอดสำหรับกลับไปหน้ารายการ
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}