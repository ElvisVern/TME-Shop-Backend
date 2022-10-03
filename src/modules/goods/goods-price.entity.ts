import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IGoodsPriceDtoOptions } from './dtos/goods-price.dto';
import { GoodsPriceDto } from './dtos/goods-price.dto';

@Entity({ name: 'goods_price' })
@UseDto(GoodsPriceDto)
export class GoodsPriceEntity extends AbstractEntity<
  GoodsPriceDto,
  IGoodsPriceDtoOptions
> {
  @Column('bigint', {
    nullable: false,
    name: 'id',
  })
  id: string;

  @Column('double', {
    nullable: false,
    name: 'price',
  })
  price: number;

  @Column('varchar', {
    nullable: false,
    name: 'currency',
  })
  currency: string;

  @Column('smallint', {
    nullable: false,
    name: 'type',
  })
  type: number;
}
