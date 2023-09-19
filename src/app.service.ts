import { Injectable } from '@nestjs/common';
import type { Prisma, PrismaClient, user } from '@prisma/client';
import { log } from 'console';

import { PrismaService } from './prisma.service';
import { TransferDate } from './common/utils/TransferDate';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }
  getHello(): string {
    return 'Hello World!';
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }
  async getHelloTest(name: string): Promise<string> {
    const user: Prisma.userCreateInput = {
      username: '11231111111123',
      password: '',
      real_name: '',
      head_url: null,
      gender: 0,
      mobile: '11121121111123',
      status: 0,
      updater_id: 0,
      is_delete: false,
      creator_id: 0,
      create_time: new Date(),
      update_time: new Date(),
      id_card: '1165411613221211225123',
    };

    await this.prisma.user.create({ data: user });

    return `Hello ${name}!`;
  }
}
