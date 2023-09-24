import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from 'src/auth/password.service';
import { EnumRoleType } from 'src/common/enumerate/enum-role-type';
import { Injectable, Scope } from '@nestjs/common';
// import type { user } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService // private passwordService: PasswordService
  ) {}

  // async findUserById(userId: number): Promise<user | null> {
  //   return this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });
  // }
  // async getUsernameById(userId: number): Promise<string | undefined> {
  //   const data = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //     select: {
  //       username: true,
  //     },
  //   });
  //   return data?.username;
  // }
  // async findUser(username: string, role: string): Promise<user[] | null> {
  //   const role_id = await this.prisma.role.findFirst({
  //     where: {
  //       remark: role,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });

  //   const user_id = await this.prisma.role_user.findMany({
  //     where: {
  //       role_id: role_id?.id,
  //     },
  //     select: {
  //       user_id: true,
  //     },
  //   });

  //   const userids = user_id.map((item) => item.user_id);

  //   // const filteredUserIds: number[] = user_ids.filter(
  //   //   (id): id is number => id !== null
  //   // );
  //   const userids_notnull: number[] = userids.filter(
  //     (id): id is number => id !== null
  //   );
  //   console.log(userids_notnull);

  //   const users = await this.prisma.user.findMany({
  //     where: {
  //       real_name: username,
  //       id: { in: userids_notnull },
  //     },
  //   });

  //   return users;
  // }

  // TODO:更新用户
  // updateUser(
  //   userId: int,
  //   newUserData: UpdateUserInput
  // ): Prisma.Prisma__userClient<User, never> {
  //   return this.prisma.user.update({
  //     data: newUserData,
  //     where: {
  //       id: userId,
  //     },
  //   });
  // }

  // TODO：修改用户密码
  // async changePassword(
  //   userId: string,
  //   userPassword: string,
  //   changePassword: ChangePasswordInput
  // ): Promise<User> {
  //   const passwordValid = await this.passwordService.validatePassword(
  //     changePassword.oldPassword,
  //     userPassword
  //   );

  //   if (!passwordValid) {
  //     throw new BadRequestException('Invalid password');
  //   }

  //   const hashedPassword = await this.passwordService.hashPassword(
  //     changePassword.newPassword
  //   );

  //   return this.prisma.user.update({
  //     data: {
  //       password: hashedPassword,
  //     },
  //     where: { id: userId },
  //   });
  // }
}
@Injectable({ scope: Scope.REQUEST })
export class CurrentUser {
  private userId: number;

  setUserId(userId: number): void {
    console.log('执行了!!!!');
    this.userId = userId;
  }

  getUserId(): number {
    return this.userId;
  }
}
