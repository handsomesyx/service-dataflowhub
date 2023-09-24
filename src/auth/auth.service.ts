import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import type { user } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import type { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';
import type { SecurityConfig } from 'src/common/configs/config.interface';
import type { User } from 'src/modules/users/models/user.model';
import internal from 'stream';

import type { SignupInput } from './dto/signup.input';
import type { Token } from './models/token.model';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  // async createuser(payload: SignupInput): Promise<Token> {
  //   const hashedPassword = await this.passwordService.hashPassword(
  //     payload.password
  //   );

  //   try {
  //     const user = await this.prisma.user.create({
  //       data: {
  //         ...payload,
  //         password: hashedPassword,
  //       },
  //     });

  //     return this.generateTokens({
  //       userId: user.id,
  //       role,
  //     });
  //   } catch (e) {
  //     if (
  //       e instanceof Prisma.PrismaClientKnownRequestError &&
  //       e.code === 'P2002'
  //     ) {
  //       throw new ConflictException(
  //         `userName ${payload.username} already used.`
  //       );
  //     }
  //     throw new Error((e as Error).message);
  //   }
  // }

  // async login(
  //   username: string,
  //   password: string
  // ): Promise<{ token: Token; userId: number }> {
  //   const user = await this.prisma.user.findUnique({ where: { username } });
  //   //抛出的异常用于前端验证 1代表用户名错误 2代表密码错误

  //   if (!user) {
  //     throw new NotFoundException('1');
  //   }
  //   const userOtherInfo = await this.prisma.role_user.findFirst({
  //     where: {
  //       user_id: user.id,
  //     },
  //   });

  //   if (!userOtherInfo) {
  //     throw new NotFoundException(`没有找到用户角色: ${username}`);
  //   }

  //   const roleObject = await this.prisma.role.findUnique({
  //     where: { id: userOtherInfo.role_id },
  //   });

  //   if (!roleObject) {
  //     throw new NotFoundException('找不到该用户角色');
  //   }
  //   const passwordValid = await this.passwordService.validatePassword(
  //     password,
  //     user.password
  //   );

  //   if (!passwordValid) {
  //     throw new BadRequestException('2');
  //   }
  //   const token = this.generateTokens({
  //     userId: user.id,
  //     role: roleObject?.name as string,
  //     role_id: roleObject?.id,
  //   });
  //   return { token, userId: user.id };
  // }

  // validateuser(userId: number): Promise<user> {
  //   return this.prisma.user.findUnique({
  //     where: { id: userId },
  //   }) as Promise<user>;
  // }

  // async getuserFromToken(token: string): Promise<User> {
  //   const getToken = this.jwtService.decode(token) as {
  //     [key: string]: string | number;
  //   };
  //   if (getToken !== null && 'userId' in getToken && 'role' in getToken) {
  //     const id = getToken['userId'];
  //     const role = getToken['role'] as string;
  //     const role_id = getToken['role_id'] as number;
  //     const user = await this.prisma.user.findUnique({
  //       where: { id: Number(id) },
  //     });
  //     if (user) {
  //       return { ...user, role: role, role_id: role_id };
  //     } else throw new UnauthorizedException();
  //   } else throw new UnauthorizedException();
  // }

  generateTokens(payload: {
    userId: number;
    role_id: number;
    role: string;
  }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: {
    userId: number;
    role: string;
  }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: {
    userId: number;
    role: string;
  }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig!.refreshIn,
    });
  }

  refreshToken(token: string): Token {
    try {
      const { userId, role_id, role } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
        role_id,
        role,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  getUserIdFromRequest(req: Request): number | null {
    console.log('req', req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1]; // 去掉 "Bearer " 前缀
    if (!token) return null;
    console.log('token', token);

    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      return userId;
    } catch (err) {
      console.log('拦截器出问题', err);
      // throw new UnauthorizedException();
      return 1;
    }
  }
}
