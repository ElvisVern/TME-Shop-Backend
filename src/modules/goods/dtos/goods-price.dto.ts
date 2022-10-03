import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { GoodsPriceEntity } from '../goods-price.entity';

export interface IGoodsPriceDtoOptions {}

export class GoodsPriceDto extends AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  type: number;

  constructor(entityName: GoodsPriceEntity, options?: IGoodsPriceDtoOptions) {
    super(entityName);
    this.id = entityName.id;
    this.price = entityName.price;
    this.currency = entityName.currency;
    this.type = entityName.type;
  }
}
