import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module'; // **นำเข้า EmployeesModule ที่นี่**

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // หรือ IP ของ PostgreSQL server
      port: 5432, // พอร์ตเริ่มต้นของ PostgreSQL
      username: 'postgres', // **เปลี่ยนเป็นชื่อผู้ใช้ PostgreSQL ของคุณ**
      password: 'Welcome@1', // **เปลี่ยนเป็นรหัสผ่าน PostgreSQL ของคุณ**
      database: 'my_crud_db', // ชื่อฐานข้อมูลที่เราสร้างไว้
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // บอก TypeORM ว่าไฟล์ Entity อยู่ที่ไหน
      synchronize: true, // **ควรเป็น false ใน Production** (จะสร้าง/อัปเดตตารางให้โดยอัตโนมัติ)
    }),
     EmployeesModule // **เพิ่ม EmployeesModule ที่นี่**
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
