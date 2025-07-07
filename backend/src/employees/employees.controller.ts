import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees') // **กำหนด URL Path สำหรับ API พนักงาน เช่น http://localhost:3000/employees**
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post() // **Method สำหรับเพิ่มพนักงาน (HTTP POST)**
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get() // **Method สำหรับดึงพนักงานทั้งหมด (HTTP GET)**
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id') // **Method สำหรับดึงพนักงานคนเดียวตาม ID (HTTP GET /employees/1)**
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id); // แปลง id จาก string เป็น number
  }

  @Patch(':id') // **Method สำหรับแก้ไขพนักงานบางส่วน (HTTP PATCH /employees/1)**
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id') // **Method สำหรับลบพนักงาน (HTTP DELETE /employees/1)**
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
