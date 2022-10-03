import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidatorService } from '../../shared/services/validator.service';
import { BannerEntity } from './banner.entity';
import type { BannerDto } from './dtos/banner.dto';
import { CreateBannerDto } from './dtos/create-banner.dto';
import type { UpdateBannerDto } from './dtos/update-banner.dto';
import { BannerNotFoundException } from './exceptions/banner-not-found.exception';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private bannerRepository: Repository<BannerEntity>,
    private validatorService: ValidatorService,
  ) {}

  async getAllBanner(): Promise<BannerDto[]> {
    const items = await this.bannerRepository.find({ take: 10 });

    return items.toDtos();
  }

  async getSingleBanner(id: string): Promise<BannerEntity> {
    const queryBuilder = this.bannerRepository
      .createQueryBuilder('banner')
      .where('banner.id = :id', { id });

    const bannerEntity = await queryBuilder.getOne();

    if (!bannerEntity) {
      throw new BannerNotFoundException();
    }

    return bannerEntity;
  }

  async updateBanner(
    id: string,
    updateBannerDto: UpdateBannerDto,
  ): Promise<void> {
    const queryBuilder = this.bannerRepository
      .createQueryBuilder('banner')
      .where('banner.id = :id', { id });

    const bannerEntity = await queryBuilder.getOne();

    if (!bannerEntity) {
      throw new BannerNotFoundException();
    }

    this.bannerRepository.merge(bannerEntity, updateBannerDto);

    await this.bannerRepository.save(updateBannerDto);
  }

  async deleteBanner(id: string): Promise<void> {
    const queryBuilder = this.bannerRepository
      .createQueryBuilder('banner')
      .where('banner.id = :id', { id });

    const bannerEntity = await queryBuilder.getOne();

    if (!bannerEntity) {
      throw new BannerNotFoundException();
    }

    await this.bannerRepository.remove(bannerEntity);
  }
}
