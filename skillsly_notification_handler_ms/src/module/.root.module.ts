import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '../environments';
import { NotificationHandlerModule } from '../notification_handler/notification_handler.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${setEnvironment()}`,
    }),
    NotificationHandlerModule
  ],
})
export class RootModule {}
