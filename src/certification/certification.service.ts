import { Injectable } from '@nestjs/common';

import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Certification } from "./entities/certification.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class CertificationService {
  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async createCertification(createCertificationDto: CreateCertificationDto) {
    const { imp_uid } = createCertificationDto;
    const httpService = new HttpService();

    // 환경 변수에서 imp_key와 imp_secret 읽기
    const imp_key = this.configService.get('PORTONE_API_KEY');
    const imp_secret = this.configService.get('PORTONE_API_SECRET');

    // 토큰 발급
    try {
      const tokenResponse = await httpService.axiosRef({
        url: 'https://api.iamport.kr/users/getToken',
        method: 'POST',
        data: {
          imp_key, // REST API키
          imp_secret, // REST API Secret
        },
      });

      const { access_token } = tokenResponse.data.response;

      // imp_uid로 인증 정보 조회
      const certificationResponse = await httpService.axiosRef({
        url: `https://api.iamport.kr/certifications/${imp_uid}`,
        headers: { Authorization: access_token },
        method: 'GET',
      });

      const certificationData = certificationResponse.data.response;

      const certification = this.certificationRepository.create({
        ...certificationData,
        birth: new Date(certificationData.birth * 1000),
        birthday: new Date(certificationData.birthday),
        certified_at: new Date(certificationData.certified_at * 1000),
      });

      await this.certificationRepository.save(certification);

      return certification;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findAll(): Promise<Certification[]> {
    return this.certificationRepository.find();
  }
}
