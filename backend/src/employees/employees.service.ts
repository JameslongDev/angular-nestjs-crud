import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) // **บอก NestJS ว่าจะใช้ Repository ของ Employee Entity**
    private employeesRepository: Repository<Employee>, // ตัวแปรนี้จะใช้คุยกับฐานข้อมูล
  ) {}
  
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // สร้าง Object ของ Employee จากข้อมูลที่รับเข้ามา
    const newEmployee = this.employeesRepository.create(createEmployeeDto);
    // บันทึกลงฐานข้อมูลและส่ง Object ที่บันทึกแล้วกลับไป
    return this.employeesRepository.save(newEmployee);
  }

  async findAll(): Promise<Employee[]> {
    // ดึงข้อมูลพนักงานทั้งหมดจากฐานข้อมูล
    return this.employeesRepository.find();
  }

   async findOne(id: number): Promise<Employee> {
    // ค้นหาพนักงานจาก ID
    const employee = await this.employeesRepository.findOneBy({ id });
    if (!employee) {
      // ถ้าไม่พบ จะโยน Error ว่าหาไม่เจอ
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    // หาพนักงานเดิมก่อน
    const employee = await this.findOne(id);
    // อัปเดตข้อมูลใน Object ของพนักงานเดิมด้วยข้อมูลใหม่
    Object.assign(employee, updateEmployeeDto);
    // บันทึกการเปลี่ยนแปลงลงฐานข้อมูล
    return this.employeesRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    // ลบพนักงานจาก ID
    const result = await this.employeesRepository.delete(id);
    if (result.affected === 0) {
      // ถ้าไม่มีการลบข้อมูล (เช่น หา ID ไม่เจอ) จะโยน Error
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
  }
}
