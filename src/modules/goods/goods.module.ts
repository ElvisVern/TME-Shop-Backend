/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoodsController } from './goods.controller';
import { GoodsEntity } from './goods.entity';
import { GoodsService } from './goods.service';
import { GoodsPriceEntity } from './goods-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity, GoodsPriceEntity])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
