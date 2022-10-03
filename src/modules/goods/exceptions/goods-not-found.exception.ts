import { NotFoundException } from '@nestjs/common';

export class GoodsNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.goodsNotFound', error);
  }
}
