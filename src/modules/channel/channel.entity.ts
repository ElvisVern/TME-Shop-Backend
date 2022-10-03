import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IChannelDtoOptions } from './dtos/channel.dto';
import { ChannelDto } from './dtos/channel.dto';

@Entity({ name: 'channel' })
@UseDto(ChannelDto)
export class ChannelEntity extends AbstractEntity<
  ChannelDto,
  IChannelDtoOptions
> {
  @Column('bigint', {
    nullable: false,
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    name: 'icon_url',
  })
  iconUrl: string;

  @Column('smallint', {
    nullable: false,
    name: 'sort_order',
  })
  sortOrder: string;
}
