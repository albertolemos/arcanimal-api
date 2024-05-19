import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../src/enums/role.enum';

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function userSeed(prisma: PrismaClient) {
  const users = [
    {
      email: 'arcanimal.dev@gmail.com',
      name: 'Admin ArcAnimal',
      password: 'ecadLEnDAyAn',
      role: Role.Admin,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'soulebarbosa@gmail.com',
      name: 'Admin DEV',
      password: 'Teste@123',
      role: Role.Admin,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'arcanimal.voluntarios@gmail.com',
      name: 'Voluntário ArcAnimal',
      password: 'ecadLEnDAyAn',
      role: Role.Volunteer,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'user1@example.com',
      name: 'User One',
      password: 'password1',
      role: Role.Volunteer,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'user2@example.com',
      name: 'User Two',
      password: 'password2',
      role: Role.Volunteer,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'user3@example.com',
      name: 'User Three',
      password: 'password3',
      role: Role.Volunteer,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'user4@example.com',
      name: 'User Four',
      password: 'password4',
      role: Role.Volunteer,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'user5@example.com',
      name: 'User Five',
      password: 'password5',
      role: Role.Admin,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'user6@example.com',
      name: 'User Six',
      password: 'password6',
      role: Role.Admin,
      phone: '',
      updatedBy: 0,
    },
    {
      email: 'user7@example.com',
      name: 'User Seven',
      password: 'password7',
      role: Role.Admin,
      phone: '',
      updatedBy: 0,
    },
  ];

  for (let user of users) {
    user.password = await hashPassword(user.password);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user },
    });
  }
}
