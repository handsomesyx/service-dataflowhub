import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';

@Module({
  imports: [],
  providers: [ExampleService, PrismaService],
  controllers: [ExampleController],
})
export class ExampleModule {}
