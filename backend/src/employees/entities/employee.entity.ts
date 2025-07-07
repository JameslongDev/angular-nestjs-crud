import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false, name: 'first_name' })
    firstName: string; // แมปกับ first_name ใน DB

    @Column({ length: 100, nullable: false, name: 'last_name' })
    lastName: string; // แมปกับ last_name ใน DB

    @Column({ length: 255, unique: true, nullable: false })
    email: string;

    @Column({ length: 20, nullable: true, name: 'phone_number' })
    phoneNumber: string; // แมปกับ phone_number ใน DB

    @Column({ type: 'date', nullable: false, name: 'hire_date' })
    hireDate: Date; // แมปกับ hire_date ใน DB

    @Column({ length: 100, nullable: true, name: 'job_title' })
    jobTitle: string; // แมปกับ job_title ใน DB

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false, default: 0.00 })
    salary: number;

    @Column({ length: 100, nullable: true })
    department: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
