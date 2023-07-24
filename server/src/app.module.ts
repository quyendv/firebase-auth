import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ConfigModule.forRoot(), ResourcesModule, UserModule, AuthModule],
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
