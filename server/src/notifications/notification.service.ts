import * as admin from 'firebase-admin';
import { NotificationMulticastMessageDto } from './dtos/message.dto';
import { Injectable } from '@nestjs/common';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class NotificationService {
  async notifyMulticast(
    dto: NotificationMulticastMessageDto,
  ): Promise<BatchResponse> {
    return await admin.messaging().sendEachForMulticast(dto);
  }
}
