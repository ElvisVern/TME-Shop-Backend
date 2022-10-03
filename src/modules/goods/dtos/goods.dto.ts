import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { GoodsEntity } from '../goods.entity';

export interface IGoodsDtoOptions {}

export class GoodsDto extends AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  channelId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  cover: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  priceIds: string;

  @ApiProperty()
  time: string;

  constructor(entityName: GoodsEntity, options?: IGoodsDtoOptions) {
    super(entityName);
    this.id = entityName.id;
    this.channelId = entityName.channelId;
    this.name = entityName.name;
    this.author = entityName.author;
    this.cover = entityName.cover;
    this.url = entityName.url;
    this.priceIds = entityName.priceIds;
    this.time = entityName.time;
  }
}
