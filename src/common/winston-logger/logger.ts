// 此部分注释掉的内容为logger写入数据库的配置

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { PrismaService } from 'nestjs-prisma';
import type { Logger, LoggerOptions } from 'winston';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import DatabaseTransport from './database-transport';
import type { LogInfo } from './dto/info';

// import DatabaseTransport from './database-transport';

@Injectable()
export class MyLoggerService {
  public logger: Logger;
  public prismaLogger: Logger;
  public databaseLogger: Logger;

  // constructor(private prisma: PrismaService) {
  constructor(private prisma: PrismaService) {
    const logTransport = new DailyRotateFile({
      filename: 'logs/%DATE%-info.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    const errorTransport = new DailyRotateFile({
      filename: 'logs/%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    });

    const prismaTransport = new DailyRotateFile({
      filename: 'logs/%DATE%-prisma.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    const prismaErrorTransport = new DailyRotateFile({
      filename: 'logs/%DATE%-prisma-error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    });

    const options: LoggerOptions = {
      level: 'info',
      format: format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [errorTransport, logTransport],
    };
    const prismaOptions: LoggerOptions = {
      level: 'info',
      format: format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [prismaTransport, prismaErrorTransport],
    };
    const myLevels = {
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
        login: 7, // 添加自定义的 'login' 级别
        operation: 8,
      },
      colors: {
        // ...颜色定义
      },
    };
    const databaseTransport = new DatabaseTransport(
      {
        format: format.simple(),
      },
      this.prisma
    );
    const databaseLoggerOptions: LoggerOptions = {
      levels: myLevels.levels,
      level: 'operation',
      format: format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [databaseTransport],
    };
    // 创建Logger对象
    this.logger = createLogger(options);
    this.prismaLogger = createLogger(prismaOptions);
    this.databaseLogger = createLogger(databaseLoggerOptions);
    this.logger.add(
      new transports.Console({
        format: format.simple(),
      })
    );
    this.prismaLogger.add(
      new transports.Console({
        format: format.simple(),
      })
    );

    this.logger.add(databaseTransport);
  }
  async logToDatabase(info: LogInfo): Promise<void> {
    console.log('logToDatabase 被调用了');
    await this.databaseLogger.log(info);
  }
}
