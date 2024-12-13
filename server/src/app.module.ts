import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ResourcesModule,
    UserModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes({
    //   // path: '*', // or forRoutes(SomeController) | many objects {path, method}
    //   path: '/resources',
    //   method: RequestMethod.ALL,
    // });
  }
}
