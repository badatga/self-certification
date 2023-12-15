import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [HttpModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}