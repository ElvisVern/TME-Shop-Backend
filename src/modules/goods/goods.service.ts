import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ValidatorService } from '../../shared/services/validator.service';
import type { GetGoodsDto } from './dtos/get-goods.dto';
import type { GoodsDto } from './dtos/goods.dto';
import type { UpdateGoodsDto } from './dtos/update-goods.dto';
import { GoodsNotFoundException } from './exceptions/goods-not-found.exception';
import { GoodsEntity } from './goods.entity';
import { GoodsPriceEntity } from './goods-price.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(GoodsPriceEntity)
    private goodsPriceRepository: Repository<GoodsPriceEntity>,
    private validatorService: ValidatorService,
  ) {}

  async getAllGoods(getGoodsDto: GetGoodsDto): Promise<GoodsDto[]> {
    const queryBuilder = this.goodsRepository.createQueryBuilder('goods');

    if (getGoodsDto.channelId) {
      queryBuilder.where('goods.channel_id = :channelId', {
        channelId: Number(getGoodsDto.channelId),
      });
    }

    queryBuilder.take(10);
    const items = await queryBuilder.getMany();

    return items.toDtos();
  }

  async getSingleGoods(id: string): Promise<GoodsEntity> {
    const postEntity = await this.goodsRepository.findOne({ where: { id } });

    if (!postEntity) {
      throw new GoodsNotFoundException();
    }

    return postEntity;
  }

  async getGoodsPrice(ids: string[]) {
    return await this.goodsPriceRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async updateGoods(id: string, updateGoodsDto: UpdateGoodsDto): Promise<void> {
    const queryBuilder = this.goodsRepository
      .createQueryBuilder('goods')
      .where('goods.id = :id', { id });

    const goodsEntity = await queryBuilder.getOne();

    if (!goodsEntity) {
      throw new GoodsNotFoundException();
    }

    this.goodsRepository.merge(goodsEntity, updateGoodsDto);
    await this.goodsRepository.save(updateGoodsDto);
  }

  async deleteGoods(id: string): Promise<void> {
    const queryBuilder = this.goodsRepository
      .createQueryBuilder('goods')
      .where('goods.id = :id', { id });

    const goodsEntity = await queryBuilder.getOne();

    if (!goodsEntity) {
      throw new GoodsNotFoundException();
    }

    await this.goodsRepository.remove(goodsEntity);
  }
}
