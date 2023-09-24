import { Module } from '@nestjs/common';

import { CreateAndsellService } from './createAndsell.service';
import { CreateAndsellController } from './createAndsell.controller';

@Module({
  imports: [],
  providers: [CreateAndsellService],
  controllers: [CreateAndsellController],
})
export class CreateAndsellModule {}
