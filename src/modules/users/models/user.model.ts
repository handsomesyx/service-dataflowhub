import 'reflect-metadata';

import { BaseModel } from 'src/common/models/base.model';
// export type user = {
//   id: number;
//   id_card: string;
//   username: string;
//   password: string;
//   real_name: string;
//   head_url: string | null;
//   gender: number;
//   mobile: string;
//   status: number;
//   creator_id: number;
//   create_time: Date;
//   updater_id: number;
//   update_time: Date;
//   is_delete: boolean;
// };

export class User extends BaseModel {
  id: number;

  username: string;

  password: string;

  id_card: string;

  real_name: string;

  head_url: string | null;

  gender: number;

  mobile: string;

  status: number;

  // 角色
  role?: string;

  // 角色ID
  role_id?: number;
}
