import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  goodsId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  priceId: string;
}
