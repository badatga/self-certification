import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus, Get
} from "@nestjs/common";
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from './dto/create-certification.dto';

@Controller('cert')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @Post()
  async createCertification(
    @Body() createCertificationDto: CreateCertificationDto,
  ) {
    try {
      const certification = await this.certificationService.createCertification(
        createCertificationDto,
      );
      return certification;
    } catch (error) {
      throw new HttpException(
        'Failed to create certification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('check')
  findAll() {
    return this.certificationService.findAll();
  }
}
