import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import { firebaseConfig } from './configs/firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: firebaseConfig.private_key,
      client_email: firebaseConfig.client_email,
      project_id: firebaseConfig.project_id,
    } as Partial<admin.ServiceAccount>),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  await app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
}
bootstrap();
