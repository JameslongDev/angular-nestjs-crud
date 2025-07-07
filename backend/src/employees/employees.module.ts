import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity'; // นำเข้า Employee Entity

@Module({
  imports: [TypeOrmModule.forFeature([Employee])], // **เพิ่ม Employee Entity ที่นี่** เพื่อให้ Service สามารถใช้ Repository ได้
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
