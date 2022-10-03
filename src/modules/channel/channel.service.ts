import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidatorService } from '../../shared/services/validator.service';
import { ChannelEntity } from './channel.entity';
import type { ChannelDto } from './dtos/channel.dto';
import type { UpdateChannelDto } from './dtos/update-channel.dto';
import { ChannelNotFoundException } from './exceptions/channel-not-found.exception';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>,
    private validatorService: ValidatorService,
  ) {}

  async getAllChannel(): Promise<ChannelDto[]> {
    const items = await this.channelRepository.find({ take: 10 });

    return items.toDtos();
  }

  async updateChannel(
    id: string,
    updateChannelDto: UpdateChannelDto,
  ): Promise<void> {
    const queryBuilder = this.channelRepository
      .createQueryBuilder('channel')
      .where('channel.id = :id', { id });

    const channelEntity = await queryBuilder.getOne();

    if (!channelEntity) {
      throw new ChannelNotFoundException();
    }

    this.channelRepository.merge(channelEntity, updateChannelDto);
    await this.channelRepository.save(updateChannelDto);
  }

  async deleteChannel(id: string): Promise<void> {
    const queryBuilder = this.channelRepository
      .createQueryBuilder('channel')
      .where('channel.id = :id', { id });

    const channelEntity = await queryBuilder.getOne();

    if (!channelEntity) {
      throw new ChannelNotFoundException();
    }

    await this.channelRepository.remove(channelEntity);
  }
}
