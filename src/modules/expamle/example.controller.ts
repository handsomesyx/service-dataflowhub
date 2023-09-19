import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ExampleService } from './example.service';

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('hello')
  getHelloName(@Param('name') name: string): string {
    return 'ok';
  }
}
