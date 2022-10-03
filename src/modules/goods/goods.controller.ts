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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth } from '../../decorators';
import { GetGoodsDto } from './dtos/get-goods.dto';
import { GoodsDto } from './dtos/goods.dto';
import { UpdateGoodsDto } from './dtos/update-goods.dto';
import { GoodsService } from './goods.service';

@Controller('goods')
@ApiTags('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllchannel(@Query() getGoodsDto: GetGoodsDto): Promise<GoodsDto[]> {
    return this.goodsService.getAllGoods(getGoodsDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GoodsDto })
  async getSinglePost(@Param('id') id: string) {
    const entity = await this.goodsService.getSingleGoods(id);
    const prices = await this.goodsService.getGoodsPrice(
      entity.priceIds.split(','),
    );

    return { ...entity.toDto(), prices };
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updatechannel(
    @Param('id') id: string,
    @Body() updateGoodsDto: UpdateGoodsDto,
  ): Promise<void> {
    return this.goodsService.updateGoods(id, updateGoodsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deletechannel(@Param('id') id: string): Promise<void> {
    await this.goodsService.deleteGoods(id);
  }
}
