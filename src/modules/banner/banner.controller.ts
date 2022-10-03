import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth } from '../../decorators';
import { BannerService } from './banner.service';
import type { BannerDto } from './dtos/banner.dto';
import { CreateBannerDto } from './dtos/create-banner.dto';
import { UpdateBannerDto } from './dtos/update-banner.dto';

@Controller('banners')
@ApiTags('banners')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  // @Post()
  // @Auth([])
  // @HttpCode(HttpStatus.CREATED)
  // async createBanner(@Body() createBannerDto: CreateBannerDto) {
  //   const entity = await this.bannerService.createBanner(createBannerDto);

  //   return entity.toDto();
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllBanner(): Promise<BannerDto[]> {
    return this.bannerService.getAllBanner();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSingleBanner(@Param('id') id: string): Promise<BannerDto> {
    const entity = await this.bannerService.getSingleBanner(id);

    return entity.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateBanner(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<void> {
    return this.bannerService.updateBanner(id, updateBannerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteBanner(@Param('id') id: string): Promise<void> {
    await this.bannerService.deleteBanner(id);
  }
}
