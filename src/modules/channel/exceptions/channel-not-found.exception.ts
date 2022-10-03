import { NotFoundException } from '@nestjs/common';

export class ChannelNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.channelNotFound', error);
  }
}
