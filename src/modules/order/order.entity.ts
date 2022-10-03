import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { OrderDto } from './dtos/order.dto';

@Entity({ name: 'orders' })
@UseDto(OrderDto)
export class OrderEntity extends AbstractEntity<OrderDto> {
  @Column('bigint', {
    nullable: false,
    name: 'id',
  })
  id: string;

  @Column('bigint', {
    nullable: false,
    name: 'goods_id',
  })
  goodsId: string;

  @Column('varchar', {
    nullable: false,
    name: 'user_id',
  })
  userId: string;

  @Column('tinyint', {
    nullable: false,
    name: 'order_status',
  })
  orderStatus: number;

  @Column('varchar', {
    nullable: false,
    name: 'price_id',
  })
  priceId: string;
}
