import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createInput: Partial<Account>): Promise<Account> {
    try {
      const account = await this.accountRepository.save(createInput);

      return account;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOneByUserId(userId: string) {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          user: Equal(userId),
        },
      });
      return account;
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(id, data: { refresh_token: string; access_token: string }) {
    try {
      const account = await this.accountRepository.update({ id }, data);
      console.log('account', account);
      return account;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOneByProviderAccountId(providerAccountId: string) {
    const user = await this.accountRepository.findOne({
      where: { providerAccountId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with email ${providerAccountId} not found`,
      );
    }
    return user;
  }
}
