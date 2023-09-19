import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.user.deleteMany();
  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      id_card: '1234567890',
      username: 'username',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      real_name: '管理员',
      head_url: 'base64string',
      gender: 0,
      mobile: '13676343909',
      status: 0,
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 1,
      updater_id: 1,
      is_delete: false,
    },
  });
  // 根据你的表结构和需求插入角色
  await prisma.role.create({
    data: {
      name: 'superAdmin',
      remark: '超级管理员',
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });
  // 添加 'filmPolice' 角色
  await prisma.role.create({
    data: {
      name: 'filmPolice',
      remark: '片警',
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  // 添加 'communityDirector' 角色
  await prisma.role.create({
    data: {
      name: 'communityDirector',
      remark: '社区主任',
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  // 添加 'gridMember' 角色
  await prisma.role.create({
    data: {
      name: 'gridMember',
      remark: '网格员',
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  // 添加 'Director' 角色
  await prisma.role.create({
    data: {
      name: 'Director',
      remark: '所长',
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  // 添加 'gridLength' 角色
  await prisma.role.create({
    data: {
      name: 'gridLength',
      remark: '网格长',
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  await prisma.role_user.create({
    data: {
      role_id: 1,
      user_id: 1,
      police_station_id: null,
      grid_id: 1,
      creator_id: 0,
      create_time: new Date('2023-06-07T16:41:27Z'),
      updater_id: 0,
      update_time: new Date('2023-06-07T16:41:27Z'),
      is_delete: false,
    },
  });
  await prisma.menu.create({
    data: {
      id: 1,
      pid: 0,
      name: 'helloWorld',
      url: '/helloWorld',
      permissions: 'query: helloWorld',
      menu_type: 0,
      icon: null,
      sort: 1,
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  await prisma.menu.create({
    data: {
      id: 2,
      pid: 0,
      name: 'hello',
      url: '/hello',
      permissions: 'query: hello',
      menu_type: 0,
      icon: null,
      sort: 2,
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  await prisma.menu_role.create({
    data: {
      id: 1,
      role_id: 1,
      menu_id: 1,
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  await prisma.menu_role.create({
    data: {
      id: 2,
      role_id: 1,
      menu_id: 2,
      create_time: new Date(),
      update_time: new Date(),
      creator_id: 0,
      updater_id: 0,
      is_delete: false,
    },
  });

  console.log({ user1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
