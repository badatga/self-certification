import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { HttpModule } from '@nestjs/axios';
import { Verification } from './entities/verification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Verification])], // HttpModule 임포트
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
