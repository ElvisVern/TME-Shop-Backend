import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BannerController } from './banner.controller';
import { BannerEntity } from './banner.entity';
import { BannerService } from './banner.service';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity])],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
