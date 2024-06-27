import * as admin from 'firebase-admin';
import { Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post()
  async sendNotification() {
    const response = admin.messaging().send({
      notification: {
        title: 'Hello World',
        body: 'Simple text message for demo notification',
      },
      // data: {
      //   score: '850',
      //   time: '2:45',
      // },
      token: 'token provide from client',
    });
    return response;
  }
}
