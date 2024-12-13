import { Body, Controller, Post } from '@nestjs/common';
import { NotificationMulticastMessageDto } from './dtos/message.dto';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('multicast')
  async notifyMulticast(@Body() dto: NotificationMulticastMessageDto) {
    return this.notificationService.notifyMulticast(dto);
  }
}
