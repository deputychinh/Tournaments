import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

import { TournamentsModule } from '@/modules/tournaments/tournaments.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => [
        {
          ttl: Number(cfg.get('RATE_LIMIT_TTL', '60')),
          limit: Number(cfg.get('RATE_LIMIT_LIMIT', '120')),
        },
      ],
    }),

    // TypeORM with pool
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        return ({
          type: 'mysql',
          host: cfg.get('DB_HOST'),
          port: Number(cfg.get('DB_PORT')),
          username: cfg.get('DB_USER'),
          password: cfg.get('DB_PASS'),
          database: cfg.get('DB_NAME'),
          charset: 'utf8mb4',
          autoLoadEntities: true,
          synchronize: cfg.get('NODE_ENV') === 'development',
          migrationsRun: cfg.get('NODE_ENV') === 'production',
          logging: false,
          extra: {
            connectionLimit: Number(cfg.get('DB_POOL_SIZE', '20')),
            queueLimit: 0,
            waitForConnections: true,
          },
        });
      },
    }),

    // Redis cache (global)
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: cfg.get('REDIS_HOST'),
            port: Number(cfg.get('REDIS_PORT', '6379')),
          },
          ttl: Number(cfg.get('REDIS_TTL_SECONDS', '60')),
        }),
      }),
    }),

    AuthModule,
    TournamentsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule { }
