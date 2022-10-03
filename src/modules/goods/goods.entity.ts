import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IGoodsDtoOptions } from './dtos/goods.dto';
import { GoodsDto } from './dtos/goods.dto';

@Entity({ name: 'goods' })
@UseDto(GoodsDto)
export class GoodsEntity extends AbstractEntity<GoodsDto, IGoodsDtoOptions> {
  @Column('bigint', {
    nullable: false,
    name: 'id',
  })
  id: string;

  @Column('bigint', {
    nullable: false,
    name: 'channel_id',
  })
  channelId: string;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'author',
  })
  author: string;

  @Column('varchar', {
    nullable: false,
    name: 'cover',
  })
  cover: string;

  @Column('varchar', {
    nullable: false,
    name: 'url',
  })
  url: string;

  @Column('varchar', {
    nullable: false,
    name: 'price_ids',
  })
  priceIds: string;

  @Column('bigint', {
    nullable: false,
    name: 'time',
  })
  time: string;
}
