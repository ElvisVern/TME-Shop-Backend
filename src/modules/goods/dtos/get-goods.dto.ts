import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetGoodsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  channelId: string;
}
