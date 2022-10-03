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
import { ChannelService } from './channel.service';
import type { ChannelDto } from './dtos/channel.dto';
import { UpdateChannelDto } from './dtos/update-channel.dto';

@Controller('channels')
@ApiTags('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  // @Post()
  // @Auth([])
  // @HttpCode(HttpStatus.CREATED)
  // async createchannel(@Body() createchannelDto: CreatechannelDto) {
  //   const entity = await this.channelService.createchannel(createchannelDto);

  //   return entity.toDto();
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllchannel(): Promise<ChannelDto[]> {
    return this.channelService.getAllChannel();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updatechannel(
    @Param('id') id: string,
    @Body() updatechannelDto: UpdateChannelDto,
  ): Promise<void> {
    return this.channelService.updateChannel(id, updatechannelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deletechannel(@Param('id') id: string): Promise<void> {
    await this.channelService.deleteChannel(id);
  }
}
