import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IBannerDtoOptions } from './dtos/banner.dto';
import { BannerDto } from './dtos/banner.dto';

@Entity({ name: 'banner' })
@UseDto(BannerDto)
export class BannerEntity extends AbstractEntity<BannerDto, IBannerDtoOptions> {
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
    name: 'link',
  })
  link: string;

  @Column('varchar', {
    nullable: false,
    name: 'image_url',
  })
  imageUrl: string;

  @Column('varchar', {
    nullable: false,
    name: 'content',
  })
  content: string;

  @Column('smallint', {
    nullable: false,
    name: 'enabled',
  })
  enabled: string;
}
