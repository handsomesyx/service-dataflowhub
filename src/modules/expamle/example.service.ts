import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import type { user } from '@prisma/client';

@Injectable()
export class ExampleService {
  constructor(private prisma: PrismaService) {}

  async demo(): Promise<user[]> {
    return this.prisma.user.findMany();
  }
}
