import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthOAuthDto } from './dto/auth-oauth.dto';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn/kakao')
  @HttpCode(200)
  async signInKakaoOAuth(@Body() oauthDTO: AuthOAuthDto) {
    const result = await this.authService.oauthKakaoLogin(oauthDTO);

    return result;
  }
  @Post('/signIn/google')
  @HttpCode(200)
  async signInGoogleOAuth(@Body() oauthDTO: AuthOAuthDto) {
    console.log('test');
    const result = await this.authService.oauthGoogleLogin(oauthDTO);

    return result;
  }
}
