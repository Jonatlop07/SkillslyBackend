import { CacheModule, Module } from '@nestjs/common'
import { NotificationHandlerController } from './notification_handler.controller'
import { NotificationHandlerService } from './notification_handler.service'
import { NotificationHandlerGateway } from './notification_handler.gateway'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redis_store from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService) => ({
        store: redis_store,
        host: config_service.get('REDIS_HOST'),
        port: config_service.get('REDIS_PORT'),
        ttl: config_service.get('TTL_CACHE'),
        isGlobal: true
      })
    })
  ],
  controllers: [NotificationHandlerController],
  providers: [NotificationHandlerService, NotificationHandlerGateway]
})
export class NotificationHandlerModule {}
