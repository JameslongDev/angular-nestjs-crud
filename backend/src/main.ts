import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // จะลบ property ที่ไม่ได้อยู่ใน DTO ออกจาก payload
    forbidNonWhitelisted: true, // จะปฏิเสธ request ถ้ามี property ที่ไม่ได้อยู่ใน DTO
    transform: true, // จะแปลง payload ให้เป็น instance ของ DTO class อัตโนมัติ (เช่น แปลง ID จาก string เป็น number)
  }))
  app.enableCors(); // **เปิดใช้งาน CORS**
  await app.listen(3000); // Backend จะรันที่พอร์ต 3000
}
bootstrap();
