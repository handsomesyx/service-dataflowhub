import { PrismaModule } from 'nestjs-prisma';
// import { AuthModule } from 'src/auth/auth.module';
// import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
// import { RequestMethod } from '@nestjs/common';
import config from 'src/common/configs/config';
// import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import modules from 'src/modules';
import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
// import LoggerMiddleware from 'src/common/middleware/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
// import UnifyResponseInterceptor from 'src/common/utils/unify-response.interceptor';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MyLoggerService } from './common/winston-logger/logger';
import { PrismaService } from './prisma.service';

const configService = new ConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            // 输出日志记录是在这这里
            //   {
            //     emit: 'event',
            //     level: 'query',
            //   },
            //   {
            //     emit: 'stdout',
            //     level: 'error',
            //   },
            //   {
            //     emit: 'stdout',
            //     level: 'info',
            //   },
            //   {
            //     emit: 'stdout',
            //     level: 'warn',
            //   },
          ],
        },
      },
    }),
    // redis模块的启动
    RedisModule.forRoot({
      config: {
        url: configService.get('Redis_URL'),
      },
    }),
    // nest generate module xxx 会自动导入这里
    // AuthModule,
    ...modules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: UnifyResponseInterceptor,
    // },
  ],
})
export class AppModule {
  constructor() {
    console.log(new Date());
  }
}
// export class AppModule implements NestModule {
//   // 应用全局中间件
//   configure(consumer: MiddlewareConsumer): void {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
