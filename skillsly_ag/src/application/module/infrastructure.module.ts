import * as redis_store from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService) => ({
        store: redis_store,
        host: config_service.get('REDIS_HOST'),
        port: config_service.get('REDIS_PORT'),
        ttl: config_service.get('TTL_CACHE')
      })
    })
  ]
})
export class InfrastructureModule {}
