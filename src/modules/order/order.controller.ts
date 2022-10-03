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
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import { ApiPageOkResponse, Auth, AuthUser } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderDto } from './dtos/order.dto';
import { OrderPageOptionsDto } from './dtos/order-page-options.dto';
import { OrderService } from './order.service';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: OrderDto })
  async createPost(
    @Body() createOrderDto: CreateOrderDto,
    @AuthUser() user: UserEntity,
  ) {
    this.orderService.createOrder(user.id, createOrderDto);
  }

  @Get()
  @Auth([RoleType.USER])
  @ApiPageOkResponse({ type: OrderDto })
  async getOrders(
    @Query() postsPageOptionsDto: OrderPageOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<PageDto<OrderDto>> {
    return this.orderService.getAllOrder(user.id, postsPageOptionsDto);
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: OrderDto })
  async getSingleOrder(@Param('id') id: string): Promise<OrderDto> {
    const entity = await this.orderService.getSingleOrder(id);

    return entity.toDto();
  }
}
