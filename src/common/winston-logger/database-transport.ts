import { PrismaService } from 'src/prisma.service';
import { LoggerOptions } from 'winston';
import * as Transport from 'winston-transport';
import { Injectable, Scope } from '@nestjs/common';
import type { Prisma } from '@prisma/client';

import type { LogInfo } from './dto/info';

@Injectable({ scope: Scope.REQUEST })
export default class DatabaseTransport extends Transport {
  constructor(options: LoggerOptions, private readonly prisma: PrismaService) {
    super(options);
  }

  async log(info: LogInfo, callback: VoidFunction): Promise<void> {
    try {
      // 确认 Prisma 服务正常

      // const userCount = await this.prisma.user.count();
      // console.log('\nstart\n', info, callback, userCount);
      // 根据 level 分别存储到不同的表
      console.log('执行醒了 ');
      if (info.level === 'login') {
        console.log('执行loginlogin ');
        console.log('info', info);
        const loglogin = await this.prisma.userloglogin.create({
          data: { ...info.meta, create_time: new Date() },
        });
      } else if (info.level === 'operation') {
        console.log('执行到operation日志了');
        await this.prisma.userlogoperation.create({
          data: {
            ...info.meta,
            description: info.message,
            create_time: new Date(),
          },
        });
      }
    } catch (error) {
      console.log('输出的错误是:', error);
    }

    callback();
  }
}
