import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import type { CreateOrderDto } from './dtos/create-order.dto';
import type { OrderDto } from './dtos/order.dto';
import type { OrderPageOptionsDto } from './dtos/order-page-options.dto';
import { OrderNotFoundException } from './exceptions/order-not-found.exception';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private validatorService: ValidatorService,
  ) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create({
      ...createOrderDto,
      userId,
      orderStatus: 0,
    });
    await this.orderRepository.save(order);
  }

  async getAllOrder(
    userId: string,
    orderPageOptionsDto: OrderPageOptionsDto,
  ): Promise<PageDto<OrderDto>> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .where('order.user_id = :userId', { userId });
    const [items, pageMetaDto] = await queryBuilder.paginate(
      orderPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleOrder(id: string): Promise<OrderEntity> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .where('order.id = :id', { id });

    const orderEntity = await queryBuilder.getOne();

    if (!orderEntity) {
      throw new OrderNotFoundException();
    }

    return orderEntity;
  }
}
