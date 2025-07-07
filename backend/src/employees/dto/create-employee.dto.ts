import { IsString, IsEmail, IsNumber, IsOptional, MaxLength, IsDateString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @IsDateString() // ใช้ IsDateString สำหรับวันที่ในรูปแบบ string เช่น 'YYYY-MM-DD'
  hireDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  jobTitle?: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  department?: string;
}