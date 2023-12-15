import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AccountService } from 'src/account/account.service';
import { AuthOAuthDto } from './dto/auth-oauth.dto';
import { HttpService } from '@nestjs/axios';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly accountService: AccountService,
  ) {}

  async oauthKakaoLogin(oauthDTO: AuthOAuthDto) {
    console.log(oauthDTO);
    // const kakaoToken = await this.exchangeKakaocodeForTokens(oauthDTO);
    //
    // const profile = await this.getKakaoProfile({
    //   access_token: kakaoToken?.access_token,
    // });
    //
    // const isExistUser = await this.userService.findOneByEmail(
    //   profile?.kakao_account?.email,
    // );
    //
    // if (!isExistUser) {
    //   const user = await this.register({
    //     name: profile?.properties?.nickname,
    //     email: profile?.kakao_account?.email,
    //     image: profile?.properties?.profile_image,
    //     phoneNumber: profile?.properties?.phoneNumber,
    //     gender: profile?.properties?.gender,
    //   });
    //
    //   await this.accountService.create({
    //     type: 'oauth',
    //     provider: 'kakao',
    //     providerAccountId: profile?.id,
    //     token_type: kakaoToken.token_type,
    //     access_token: kakaoToken.access_token,
    //     refresh_token: kakaoToken.refresh_token,
    //     scope: kakaoToken.scope,
    //     user: user,
    //   });
    //
    //   const [at, rt] = await Promise.all([
    //     this.getAccessToken({
    //       userId: user?.id,
    //       email: user?.email,
    //       name: user?.name,
    //       status: user?.status,
    //     }),
    //     this.getRefreshToken({ userId: user.id, email: user.email }),
    //   ]);
    //
    //   return {
    //     access_token: at,
    //     refresh_token: rt,
    //     status: user?.status,
    //   };
    // }
    //
    // // User가 잇을때
    // const existAccount = await this.accountService.findOneByUserId(
    //   isExistUser.id,
    // );
    //
    // await this.accountService.update(existAccount?.id, {
    //   access_token: kakaoToken.access_token,
    //   refresh_token: kakaoToken.refresh_token,
    // });
    //
    // const [at, rt] = await Promise.all([
    //   this.getAccessToken({
    //     userId: isExistUser.id,
    //     email: isExistUser.email,
    //     name: isExistUser.name,
    //     status: isExistUser.status,
    //   }),
    //   this.getRefreshToken({
    //     userId: isExistUser.id,
    //     email: isExistUser.email,
    //   }),
    // ]);
    //
    // return {
    //   access_token: at,
    //   refresh_token: rt,
    //   status: isExistUser.status,
    // };
  }
  async oauthGoogleLogin(oauthDTO: AuthOAuthDto) {
    const googleTokens = await this.exchangeGoogleCodeForTokens(oauthDTO);

    const profile = await this.getGoogleProfile({
      access_token: googleTokens?.access_token,
    });

    const isExistUser = await this.accountService.findOneByProviderAccountId(
      uuid(),
    );

    // if (!isExistUser) {
    //   const user = await this.register({
    //     email: profile?.email,
    //     name: profile?.name,
    //     image: profile?.picture,
    //     gender: profile?.gender,
    //     phoneNumber: profile?.phoneNumber,
    //   });
    //
    //   await this.accountService.create({
    //     type: 'oauth',
    //     provider: 'google',
    //     providerAccountId: uuid(),
    //     token_type: googleTokens?.token_type,
    //     access_token: googleTokens?.access_token,
    //     refresh_token: googleTokens?.refresh_token,
    //     id_token: googleTokens?.id_token,
    //     user: user,
    //   });
    //
    //   const [at, rt] = await Promise.all([
    //     this.getAccessToken({
    //       userId: user?.id,
    //       email: user?.email,
    //       name: user?.name,
    //       status: user?.status,
    //     }),
    //     this.getRefreshToken({ userId: user.id, email: user.email }),
    //   ]);
    //
    //   return {
    //     access_token: at,
    //     refresh_token: rt,
    //     status: user?.status,
    //   };
    // }
    //
    // // User가 잇을때
    // const existAccount = await this.accountService.findOneByUserId(
    //   isExistUser.id,
    // );
    //
    // await this.accountService.update(existAccount?.id, {
    //   access_token: googleTokens?.access_token,
    //   refresh_token: googleTokens?.refresh_token,
    // });
    //
    // const [at, rt] = await Promise.all([
    //   this.getAccessToken({
    //     userId: isExistUser.id,
    //     email: isExistUser.email,
    //     name: isExistUser.name,
    //     status: isExistUser.status,
    //   }),
    //   this.getRefreshToken({
    //     userId: isExistUser.id,
    //     email: isExistUser.email,
    //   }),
    // ]);
    //
    // return {
    //   access_token: at,
    //   refresh_token: rt,
    //   status: isExistUser.status,
    // };
  }

  async exchangeGoogleCodeForTokens({ code, state }) {
    const data = {
      grant_type: 'authorization_code',
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      state: state,
    };

    try {
      const req = await this.httpService.axiosRef({
        url: `${process.env.GOOGLE_DOMAIN}/token`,
        method: 'POST',
        data: data,
        headers: {
          'content-type': 'x-www-form-urlencoded',
        },
      });

      return req.data;
    } catch (error) {
      console.log('exchangeGoogleCodeForTokens error', error);
    }
  }

  async getGoogleProfile({ access_token }) {
    try {
      const req = await this.httpService.axiosRef({
        url: `${process.env.GOOGLE_PROFILE_DOMAIN}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        responseType: 'json',
      });

      return req.data;
    } catch (error) {
      console.log('getGoogleProfile error', error);
    }
  }

  // register(createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
}
