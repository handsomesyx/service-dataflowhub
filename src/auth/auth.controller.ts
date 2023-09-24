import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { HeadersData } from 'src/common/decorators/header.decorator';
import { HeadersDataInterface } from 'src/common/decorators/dto/headerData';
import {
  Operation,
  type UserLoginMeta,
} from 'src/common/winston-logger/dto/info';
import { Response } from 'express';
import { MyLoggerService } from 'src/common/winston-logger/logger';
import { RefreshTokenInput } from './dto/refresh-token.input';
@Controller('v1')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private myLoggerService: MyLoggerService
  ) {}

  @Get('hello/ht')
  getHelloName(@Param('name') name: string): string {
    return 'ok';
  }
  // @Post('login')
  // async login(
  //   @Body() body: any,
  //   @HeadersData() headersData: HeadersDataInterface,
  //   @Res() res: Response
  // ){
  //   const { username, password } = body;
  //   const { token, userId } = await this.auth.login(
  //     username.toLowerCase(),
  //     password
  //   );
  //   const { accessToken, refreshToken } = token;
  //   console.log('headersData', headersData);

  //   const userLoginObject: UserLoginMeta = {
  //     operation: Operation.AddPopulation,
  //     status: 0,
  //     user_agent: headersData.user_agent,
  //     ip: headersData.ip,
  //     username: username,
  //     creator_id: userId,
  //   };
  //   // 用来记录登录日志并且存储
  //   await this.myLoggerService.logToDatabase({
  //     level: 'login',
  //     message: '登录日志记录',
  //     meta: userLoginObject,
  //   });

  //   return res.status(201).json({
  //     accessToken,
  //     refreshToken,
  //   })
  // }
  // @Post('refreshToken')
  // async refreshToken(
  //   @Body() body: any,
  //   @Res() res: Response
  // ) {
  //   const { token }:RefreshTokenInput=body;
  //   return res.status(201).json(this.auth.refreshToken(token))

  // }
  // @Post('user')
  // async user(
  //   @Body() body: any,
  //   @Res() res: Response
  // ) {
  //   const { token }:RefreshTokenInput=body;
  //   return res.status(201).json(this.auth.refreshToken(token))

  // }
}
