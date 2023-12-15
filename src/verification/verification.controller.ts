import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/create-verification.dto';

@Controller('cert')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  async createVerification(
    @Body() createVerificationDto: CreateVerificationDto,
  ) {
    try {
      const verification = await this.verificationService.createVerification(
        createVerificationDto,
      );
      return verification;
    } catch (error) {
      throw new HttpException(
        'Failed to create verification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('check')
  findAll() {
    return this.verificationService.findAll();
  }
}
