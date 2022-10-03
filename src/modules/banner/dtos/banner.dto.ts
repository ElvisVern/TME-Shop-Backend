import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { BannerEntity } from '../banner.entity';

export interface IBannerDtoOptions {}

export class BannerDto extends AbstractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  enabled: string;

  constructor(entityName: BannerEntity, options?: IBannerDtoOptions) {
    super(entityName);
    this.id = entityName.id;
    this.name = entityName.name;
    this.link = entityName.link;
    this.imageUrl = entityName.imageUrl;
    this.content = entityName.content;
    this.enabled = entityName.enabled;
  }
}
