import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// import { user } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from 'nestjs-prisma';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/models/user.model';
import { CurrentUser } from 'src/modules/users/users.service';
import { NewExpression } from 'ts-morph';

import { AuthService } from './auth.service';
import type { JwtDto } from './dto/jwt.dto';
import { RoleMenuCacheService } from './role-menu-redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
    private readonly roleMenuCacheService: RoleMenuCacheService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  // async validate(payload: JwtDto): Promise<unknown> {
  //   console.log('执行了');
  //   console.log('payload', payload);

  //   // 验证用户是否存在
  //   const user = await this.authService.validateuser(payload.userId);

  //   if (!user) {
  //     // 如果用户不存在，抛出未授权异常
  //     throw new UnauthorizedException();
  //   }
  //   try {
  //     // 查找与用户关联的角色
  //     const role_user_mid = await this.prisma.role_user.findFirst({
  //       where: { user_id: user.id },
  //     });
  //     if (!role_user_mid) {
  //       // 如果没有找到与用户关联的角色，抛出未找到异常
  //       throw new NotFoundException(`No role found for user: ${user.id}`);
  //     }

  //     // 查找与角色关联的菜单
  //     const menu_roles = await this.prisma.menu_role.findMany({
  //       where: { role_id: role_user_mid.role_id },
  //     });
  //     const menuIdArray = menu_roles.map((item) => item.menu_id);

  //     // 根据菜单ID获取菜单详情
  //     const menus = await this.prisma.menu.findMany({
  //       where: { id: { in: menuIdArray } },
  //     });

  //     // 提取菜单权限
  //     const menusArray = menus
  //       .map((item) => item.permissions)
  //       .filter((item): item is string => item !== null);

  //     // 如果menusArray不为空，将角色和对应的权限存入缓存

  //     if (menusArray.length > 0) {
  //       const formattedMapping: Record<number, string[]> = {};
  //       formattedMapping[role_user_mid.role_id] = menusArray;

  //       try {
  //         await this.roleMenuCacheService.loadRoleMenuMapping(formattedMapping);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   } catch (error) {
  //     // 如果出现错误捕获错误
  //     throw new NotFoundException(error);
  //   }

  //   return { ...user, role: payload.role, role_id: payload.role_id };
  // }
}
