import { Module } from '@nestjs/common';

import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';

@Module({
  imports: [],
  providers: [ExampleService],
  controllers: [ExampleController],
})
export class ExampleModule {}
