import type { Prisma } from '@prisma/client';

export enum Operation {
  AddPopulation = 1, // '增加人口',
  UpdatePopulation = 2, // '修改人口',
  SearchPopulation = 3, // '查找人口',
  DeletePopulation = 4, // '删除人口',
  UserLogin = 5, // '用户登录',
  UserLogout = 6, // '用户退出',
  AddEvent = 7, // 增加事件
  HandleEvent = 8, // 处理事件
}

export type UserLoginMeta = {
  operation: number;
  status: number;
  user_agent: string;
  ip: string;
  username: string;
  creator_id: number;
};
export type UserOperationMeta = {
  operation: number;
  request_query: string;
  request_type: string;
  request_params: string;
  request_time: number;
  user_agent: string;
  ip: string;
  status: number;
};
export type LogInfo = {
  message: string;
  level: string;
  meta: UserLoginMeta | UserOperationMeta; // 这里放你想要记录的元数据
};
