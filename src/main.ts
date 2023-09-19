import * as bodyParser from 'body-parser';
import {
  // PrismaClientExceptionFilter,
  PrismaService,
} from 'nestjs-prisma';
import { join } from 'path';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  // HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

  // 请求体大小设置为2mb
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

  app.useWebSocketAdapter(new IoAdapter(app));

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);

  // Prisma Client Exception Filter for unhandled exceptions
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // static
  app.useStaticAssets(
    join(__dirname, configService.get('MULTER_DEST') || 'upload'),
    {
      prefix: configService.get('STATIC_PREFIX') || '/static',
    }
  );

  // Swagger Api
  // 此处确定了在app.mudule.ts中引入了config文件，config文件中绝对存在swagger相关配置，所以用!
  if (swaggerConfig!.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig!.title || 'Nestjs')
      .setDescription(
        swaggerConfig!.description || 'The nestjs API description'
      )
      .setVersion(swaggerConfig!.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig!.path || 'api', app, document);
  }

  // Cors
  // 此处确定了在app.mudule.ts中引入了config文件，config文件中绝对存在Cors相关配置，所以用!
  if (corsConfig!.enabled) {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  await app.listen(process.env.PORT || nestConfig!.port || 3000);
  console.log(
    `服务启动于：http://127.0.0.1:${
      process.env.PORT || nestConfig!.port || 3000
    }`,
    `\nrestfulapi文档：http://127.0.0.1:${
      process.env.PORT || nestConfig!.port || 3000
    }/api`,
    `\ngraphql文档：http://127.0.0.1:${
      process.env.PORT || nestConfig!.port || 3000
    }/graphql`
  );
}
bootstrap();
