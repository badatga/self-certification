import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { HttpModule } from '@nestjs/axios';
import { Certification } from './entities/certification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Certification])], // HttpModule 임포트
  controllers: [CertificationController],
  providers: [CertificationService],
})
export class CertificationModule {}
