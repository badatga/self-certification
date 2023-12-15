import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  type: string;

  @IsString()
  provider: string;

  @IsString()
  providerAccountId: string;
}
