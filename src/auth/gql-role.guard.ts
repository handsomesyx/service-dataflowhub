import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { GqlExecutionContext } from '@nestjs/graphql';
import type { User } from 'src/modules/users/models/user.model';

import { RoleMenuCacheService } from './role-menu-redis.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleMenuCacheService: RoleMenuCacheService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 通过反射

    const ctx = context.switchToHttp();
    const user: User = ctx.getRequest().user;
    // 存储访问路径，以及查询方法
    const path = ctx.getRequest().url;
    const method = ctx.getRequest().method; // "query" 或 "mutation"

    const role_function = await this.roleMenuCacheService.getMenusByRole(
      user.role_id
    );
    const hasRole = (): boolean => {
      if (role_function.includes(`${method}: ${path}`)) {
        return true;
      } else {
        return false;
      }
    };
    console.log(hasRole());

    return true;
  }
}
