import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmLogger } from '@infrastructure/adapter/persistence/typeorm/logger/typeorm.logger';
import { TypeOrmDirectory } from '@infrastructure/adapter/persistence/typeorm/typeorm.directory';
import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { MailerModule, MailerService } from '@nestjs-modules/mailer'

const setup_typeorm = (config) => ({
  name: 'default',
  type: 'postgres',
  host: config.get('AUTH_DB_HOST'),
  port: config.get('AUTH_DB_PORT'),
  username: config.get('AUTH_DB_USERNAME'),
  password: config.get('AUTH_DB_PASSWORD'),
  database: config.get('AUTH_DB_NAME'),
  schema: 'skillsly_auth',
  logging: config.get('AUTH_DB_ENABLE_LOG') ? 'all' : false,
  logger: config.get('AUTH_DB_ENABLE_LOG') ? TypeOrmLogger.new() : undefined,
  entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`],
  migrationsRun: true,
  migrations: [`${TypeOrmDirectory}/migration/**/*{.ts,.js}`],
  migrationsTransactionMode: 'all'
});

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
        logging: config.get('AUTH_DB_ENABLE_LOG') ? 'all' : false,
        logger: config.get('AUTH_DB_ENABLE_LOG') ? TypeOrmLogger.new() : undefined,
        entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`]
      })
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService) => ({
        transport: {
          host: config_service.get<string>('MAILER_HOST'),
          port: config_service.get<string>('MAILER_PORT'),
          ignoreTLS: config_service.get<boolean>('MAILER_IGNORE_TLS'),
          secure: config_service.get<boolean>('MAILER_SECURE'),
          secureConnection: false,
          tls: {
            ciphers: 'SSLv3',
          },
          auth: {
            user: config_service.get<boolean>('USER_MAILER'),
            pass: config_service.get<boolean>('PASS_MAILER'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        preview: true,
      }),
    }),
    MailerModule
  ],
  providers: [MailerService],
  exports: [MailerService]
})
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
