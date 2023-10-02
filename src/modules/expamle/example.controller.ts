import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ExampleService } from './example.service';
import type { user } from '@prisma/client';

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('hello')
  getHelloName(@Param('name') name: string): string {
    return 'ok';
  }

  @Post('/demo')
  demo(): Promise<user[]> {
    return this.exampleService.demo();
  }
}
