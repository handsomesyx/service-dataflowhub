import type { NextFunction, Request } from 'express';
import type { SecurityConfig } from 'src/common/configs/config.interface';
import { MyLoggerService } from 'src/common/winston-logger/logger';
import { CurrentUser, UsersService } from 'src/modules/users/users.service';
import { PrismaService } from 'src/prisma.service';
import type { MiddlewareConsumer } from '@nestjs/common';
import { Module, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { RolesGuard } from './gql-role.guard';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';
import { RoleMenuCacheService } from './role-menu-redis.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig!.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    RolesGuard,
    RoleMenuCacheService,
    PasswordService,
    CurrentUser,
    MyLoggerService,
    PrismaService,
    UsersService,
  ],
  exports: [GqlAuthGuard, RolesGuard, RoleMenuCacheService],
})
export class AuthModule {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  // configure(consumer: MiddlewareConsumer): void {
  //   consumer
  //     .apply((req: Request, res: Response, next: NextFunction) => {
  //       session.run(async () => {
  //         session.set('userId', this.authService.getUserIdFromRequest(req));
  //         const username = await this.usersService.getUsernameById(
  //           session.get('userId') ? session.get('userId') : -1
  //         );
  //         session.set('userName', username);
  //         next();
  //       });
  //     })
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
