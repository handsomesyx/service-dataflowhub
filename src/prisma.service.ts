// 导入所需的库和模块
import { createNamespace } from 'cls-hooked';
import { PrismaService as prisma } from 'nestjs-prisma';
import { type INestApplication, type OnModuleInit } from '@nestjs/common';
import type { Prisma } from '@prisma/client';

import { TransferDate } from './common/utils/TransferDate';

// 创建命名空间
export const session = createNamespace('usersession');
/**
 * PrismaService类，继承于nestjs-prisma的PrismaService，实现OnModuleInit接口
 */
export class PrismaService extends prisma implements OnModuleInit {
  constructor() {
    super();
  }
  /**
   * 中间件初始化
   */
  async onModuleInit() {
    await this.$connect();
    try {
      this.$use(async (params: Prisma.MiddlewareParams, next) => {
        try {
          const userId = session.get('userId');
          const userName = session.get('userName');
          console.log('userIduserId', userId);
          console.log('userNameuserName', userName);
          // 根据操作类型执行不同的处理
          switch (params.action) {
            case 'delete':
            case 'deleteMany':
              this.transformDeleteQueries(params);
              break;
            case 'findUnique':
            case 'findFirst':
            case 'findMany':
            case 'count':
              this.handleQueriesWithWhere(params);
              break;
            case 'create':
              this.addCreateParam(params, userId, userName);
              break;
            case 'update':
            case 'updateMany':
              this.addUpdateParam(params, userId);
              break;
            default:
              break;
          }
        } catch (error) {
          console.error('中间件执行过程中出现错误:', error);
        }
        return next(params);
      });
    } catch (error) {
      console.error('设置prisma中间件出错:', error);
    }
  }
  /**
   * 将删除请求转换为更新请求，用于软删除
   */
  transformDeleteQueries(params: Prisma.MiddlewareParams): void {
    params.action = params.action === 'delete' ? 'update' : 'updateMany';
    if (params.args.data !== undefined) {
      params.args.data['is_delete'] = true;
      params.args.data['update_time'] = new Date();
    } else {
      params.args['data'] = {
        is_delete: true,
        update_time: new Date(),
      };
    }
    console.log(params);
  }
  /**
   * 处理查询条件中包含is_delete=true的情况
   */
  handleQueriesWithWhere(params: Prisma.MiddlewareParams): void {
    params.action = params.action === 'findUnique' ? 'findMany' : params.action;
    if (params.args.where) {
      if (params.args.where.is_delete === undefined) {
        params.args.where['is_delete'] = false;
      }
    } else {
      params.args['where'] = { is_delete: false };
    }
  }
  /**
   * 在创建操作时添加参数
   */
  addCreateParam(
    params: Prisma.MiddlewareParams,
    userId: number,
    userName: string
  ): void {
    try {
      if (params.args.data) {
        params.args.data['create_time'] = new Date();
        console.log('userId', userId);
        if (userId) {
          params.args.data['creator_id'] = userId;
          if (params.model == 'userlogoperation') {
            params.args.data['creator_name'] = userName;
          }
        }
      }
    } catch (error) {
      console.log('创建外包含出了问题', error);
    }
  }
  /**
   * 在更新操作时添加参数
   */
  addUpdateParam(params: Prisma.MiddlewareParams, userId: number): void {
    params.action = params.action === 'update' ? 'updateMany' : params.action;
    if (params.args.where !== undefined) {
      // 在查询条件中增加 is_delete=false的条件：当and中没有出现is_delete,且没有and时
      if (
        params.args.where.is_delete === undefined &&
        params.args.where.AND === undefined // 为了解决And删除中间键的问题
      ) {
        params.args.where['is_delete'] = false;
      }
      // 当and中有值，但是isdelete为空时执行此
      if (
        params.args.where.AND !== undefined &&
        params.args.where.AND[0].is_delete === undefined
      ) {
        params.args.where['is_delete'] = false;
      }
    } else {
      params.args['where'] = { is_delete: false };
    }
    params.args.data['update_time'] = new Date();
    params.args.data['updater_id'] = userId;
  }
  /**
   * 启用关闭钩子
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
