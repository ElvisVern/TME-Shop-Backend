/*
https://docs.nestjs.com/modules
*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChannelController } from './channel.controller';
import { ChannelEntity } from './channel.entity';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
