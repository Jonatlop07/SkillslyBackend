import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmLogger } from '@infrastructure/adapter/persistence/typeorm/logger/typeorm.logger'
import { TypeOrmDirectory } from '@infrastructure/adapter/persistence/typeorm/typeorm_directory'

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
        logging: config.get('USER_DB_ENABLE_LOG') ? 'all' : false,
        logger: config.get('USER_DB_ENABLE_LOG') ? TypeOrmLogger.new() : undefined,
        entities: [`${TypeOrmDirectory}/entity/**/*{.ts,.js}`]
      })
    })
  ]
})
export class InfrastructureModule {}
