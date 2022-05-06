import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as chalk from 'chalk';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices'
import { APIServerConfiguration } from './config/api_server.config'
import { RootModule } from './module/.root.module'

export class ServerApplication {
  private readonly mq_protocol: string = APIServerConfiguration.MQ_PROTOCOL;
  private readonly mq_host: string = APIServerConfiguration.MQ_HOST;
  private readonly mq_port: number = APIServerConfiguration.MQ_PORT;
  private readonly mq_username: string = APIServerConfiguration.MQ_USERNAME;
  private readonly mq_password: string = APIServerConfiguration.MQ_PASSWORD;
  private readonly mq_queue: string = APIServerConfiguration.MQ_QUEUE;
  private readonly enable_log: boolean = APIServerConfiguration.ENABLE_LOG;

  public async run(): Promise<void> {
    try {
      const options = {};
      if (!this.enable_log) {
        options['logger'] = false;
      }
      const app = await NestFactory.createMicroservice<MicroserviceOptions>(RootModule, {
        transport: Transport.RMQ,
        options: {
          urls: [{
            protocol: this.mq_protocol,
            hostname: this.mq_host,
            port: this.mq_port,
            username: this.mq_username,
            password: this.mq_password
          }],
          queue: this.mq_queue,
          noAck: false,
          queueOptions: {
            durable: true
          }
        }
      });
      await app.listen();
      Logger.log(
        `Environment: ${chalk
          .hex('#87e8de')
          .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`
      );
      Logger.log(`✅  Server ready`);
    } catch (error) {
      Logger.error(`❌  Error starting server, ${error}`);
      process.exit();
    }
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
