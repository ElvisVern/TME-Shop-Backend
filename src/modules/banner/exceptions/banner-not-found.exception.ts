import { NotFoundException } from '@nestjs/common';

export class BannerNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.bannerNotFound', error);
  }
}
