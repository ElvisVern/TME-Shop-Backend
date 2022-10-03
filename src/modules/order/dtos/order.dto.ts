import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { OrderEntity } from '../order.entity';

export class OrderDto extends AbstractDto {
  @ApiPropertyOptional()
  goodsId?: string;

  @ApiPropertyOptional()
  orderStatus?: number;

  constructor(OrderEntity: OrderEntity) {
    super(OrderEntity);
    this.goodsId = OrderEntity.goodsId;
    this.orderStatus = OrderEntity.orderStatus;
  }
}
