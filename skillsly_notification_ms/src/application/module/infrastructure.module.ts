import { Global, Module, OnApplicationBootstrap } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmLogger } from '@infrastructure/adapter/persistence/typeorm/logger/typeorm.logger'
import { TypeOrmDirectory } from '@infrastructure/adapter/persistence/typeorm/typeorm_directory'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { RabbitMQDITokens } from '@infrastructure/adapter/messaging/rabbit-mq/di/rabbit_mq_di_tokens'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:  (config) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: config.get('NOTIFICATION_DB_ENABLE_LOG') ? 'all' : false,
        logger: config.get('NOTIFICATION_DB_ENABLE_LOG') ? TypeOrmLogger.new() : undefined,
        entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`]
      })
    })
  ],
  providers: [
    {
      provide: RabbitMQDITokens.RabbitMQMessageClient,
      useFactory: (configService: ConfigService) => {
        const protocol = configService.get('MQ_PROTOCOL');
        const username = configService.get('MQ_USERNAME');
        const password = configService.get('MQ_PASSWORD');
        const host = configService.get('MQ_HOST');
        const port = configService.get('MQ_PORT');
        const queue = configService.get('MQ_QUEUE');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [{
              protocol: protocol,
              hostname: host,
              port: port,
              username,
              password: password
            }],
            queue,
            queueOptions: {
              durable: true,
            },
          },
        })
      },
      inject: [ConfigService],
    }
  ],
  exports: [RabbitMQDITokens.RabbitMQMessageClient]
})
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
