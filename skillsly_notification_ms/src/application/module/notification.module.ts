import { Logger, Module, Provider } from '@nestjs/common';
import { NotificationController } from '@application/api/http-rest/controller/notification.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationDITokens } from '@core/domain/di/notification_di_tokens';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { CreateNotificationService } from '@core/service/create_notification.service';
import { RabbitMQNotificationMessageClientAdapter } from '@infrastructure/adapter/messaging/rabbit-mq/message-client/rabbitmq_notification.message_client_adapter';
import { RabbitMQDITokens } from '@infrastructure/adapter/messaging/rabbit-mq/di/rabbit_mq_di_tokens';
import { TypeOrmNotificationRepositoryAdapter } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_notification.repository_adapter';
import { TypeOrmNotificationRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_notification.repository';
import { TransactionalUseCaseWrapper } from '@infrastructure/transaction/transactional_interactor_wrapper';
import { TypeOrmNotificationResourceRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_notification_resource.repository';
import { TypeOrmNotificationChangeRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_notification_change.repository';
import { Connection } from 'typeorm';
import { QueryNotificationsService } from '@core/service/query_notifications.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

const persistence_providers: Array<Provider> = [
  {
    provide: NotificationDITokens.NotificationRepository,
    useFactory: (notification, notification_resource, notification_change) =>
      new TypeOrmNotificationRepositoryAdapter(
        notification,
        notification_resource,
        notification_change,
      ),
    inject: [
      TypeOrmDITokens.NotificationRepository,
      TypeOrmDITokens.NotificationResourceRepository,
      TypeOrmDITokens.NotificationChangeRepository,
    ],
  },
  {
    provide: TypeOrmDITokens.NotificationRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmNotificationRepository),
    inject: [Connection],
  },
  {
    provide: TypeOrmDITokens.NotificationResourceRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmNotificationResourceRepository),
    inject: [Connection],
  },
  {
    provide: TypeOrmDITokens.NotificationChangeRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmNotificationChangeRepository),
    inject: [Connection],
  },
];

const messaging_providers: Array<Provider> = [
  {
    provide: NotificationDITokens.NotificationMessageClient,
    useFactory: (client) =>
      new RabbitMQNotificationMessageClientAdapter(client)
    ,
    inject: [RabbitMQDITokens.RabbitMQMessageClient],
  },
];

const use_case_providers: Array<Provider> = [
  {
    provide: NotificationDITokens.CreateNotificationInteractor,
    useFactory: (repository, mq_client) =>
      new TransactionalUseCaseWrapper(
        new CreateNotificationService(repository, mq_client),
      ),
    inject: [
      NotificationDITokens.NotificationRepository,
      NotificationDITokens.NotificationMessageClient,
    ],
  },
  {
    provide: NotificationDITokens.QueryNotificationsInteractor,
    useFactory: (repository) =>
      new TransactionalUseCaseWrapper(
        new QueryNotificationsService(repository),
      ),
    inject: [NotificationDITokens.NotificationRepository],
  },
];

const rabbit_mq_providers = [
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
            protocol,
            hostname: host,
            port,
            username,
            password
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
];

@Module({
  controllers: [NotificationController],
  imports: [ConfigModule],
  providers: [
    ...rabbit_mq_providers,
    ...persistence_providers,
    ...messaging_providers,
    ...use_case_providers,
  ],
})
export class NotificationModule {}
