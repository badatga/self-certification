import { Injectable } from '@nestjs/common';

import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Verification } from './entities/verification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async createVerification(createVerificationDto: CreateVerificationDto) {
    const { imp_uid } = createVerificationDto;
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
      const verificationResponse = await httpService.axiosRef({
        url: `https://api.iamport.kr/verifications/${imp_uid}`,
        headers: { Authorization: access_token },
        method: 'GET',
      });

      const verificationData = verificationResponse.data.response;

      const verification = this.verificationRepository.create({
        ...verificationData,
        birth: new Date(verificationData.birth * 1000),
        birthday: new Date(verificationData.birthday),
        certified_at: new Date(verificationData.certified_at * 1000),
      });

      await this.verificationRepository.save(verification);

      return verification;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findAll(): Promise<Verification[]> {
    return this.verificationRepository.find();
  }
}
