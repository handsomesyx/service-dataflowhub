import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RoleMenuCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async loadRoleMenuMapping(
    roleMenuMapping: Record<number, string[]>
  ): Promise<void> {
    // 将角色和菜单的映射关系加载到 Redis 中
    for (const role_id in roleMenuMapping) {
      await this.redis.set(
        `role${role_id}`,
        JSON.stringify(roleMenuMapping[role_id])
      );
    }
  }

  async getMenusByRole(role_id?: number): Promise<string[]> {
    // 从 Redis 中获取角色对应的菜单
    const menus = await this.redis.get(`role${role_id}`);
    return menus ? JSON.parse(menus) : null;
  }

  async clearRoleMenuMapping(): Promise<void> {
    {
      // 清除 Redis 中的角色和菜单映射关系
      await this.redis.flushdb();
    }
  }
}
