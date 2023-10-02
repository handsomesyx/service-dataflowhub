import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ExampleService } from './example.service';
import type { user } from '@prisma/client';
import { ApiResponse } from 'src/common/models/ApiResponse';

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('hello')
  getHelloName(@Param('name') name: string): string {
    return 'ok';
  }

  @Post('/demo')
  async demo(): Promise<ApiResponse<user[]>> {
    return ApiResponse.success(await this.exampleService.demo());
  }
}
