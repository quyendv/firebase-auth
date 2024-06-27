import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import { firebaseConfig } from './configs/firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseConfig.project_id,
      clientEmail: firebaseConfig.client_email,
      privateKey: firebaseConfig.private_key,
    } as Partial<admin.ServiceAccount>),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  await app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });
}
bootstrap();
