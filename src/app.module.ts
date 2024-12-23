import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenValidationMiddleware } from './middleware/token-validation.middleware';
import { RolesGuard } from './core/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host:  config.get<string>('DATABASE_HOST') || 'mysql',
        port: +config.get<string>('DATABASE_PORT') || 3306,
        username: config.get<string>('DB_USER') || 'root',
        password: config.get<string>('DB_PASSWORD') || 'root',
        database: config.get<string>('DB_NAME') || 'movie_api',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    { 
    useClass: RolesGuard, provide: APP_GUARD
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenValidationMiddleware)
      .exclude(
        { path: 'auth', method: RequestMethod.POST },
        'auth/(.*)',
      )
      .forRoutes({ path: "**", method: RequestMethod.ALL });
  }
}
