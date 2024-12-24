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
import { FilmsModule } from './films/films.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host:  process.env.DATABASE_HOST || 'mysql_db',
        port: +process.env.DATABASE_PORT || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'movie_api',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    UserModule,
    AuthModule,
    FilmsModule
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
      .forRoutes({ path: "**", method: RequestMethod.ALL })
  }
}
