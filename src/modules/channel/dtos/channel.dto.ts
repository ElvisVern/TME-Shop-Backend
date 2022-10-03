import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { ChannelEntity } from '../channel.entity';

export interface IChannelDtoOptions {}

export class ChannelDto extends AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  iconUrl: string;

  @ApiProperty()
  sortOrder: string;

  constructor(entityName: ChannelEntity, options?: IChannelDtoOptions) {
    super(entityName);
    this.id = entityName.id;
    this.name = entityName.name;
    this.iconUrl = entityName.iconUrl;
    this.sortOrder = entityName.sortOrder;
  }
}
