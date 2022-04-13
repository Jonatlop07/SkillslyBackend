import { APIServerConfiguration } from '@infrastructure/config/api_server.config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { RootModule } from '@application/module/.root.module';
import * as chalk from 'chalk';

export class ServerApplication {
  private readonly host: string = APIServerConfiguration.HOST;
  private readonly port: number = APIServerConfiguration.PORT;
  //private readonly ms_host: string = APIServerConfiguration.MS_HOST;
  //private readonly ms_port: number = APIServerConfiguration.MS_PORT;
  private readonly enable_log: boolean = APIServerConfiguration.ENABLE_LOG;

  public async run(): Promise<void> {
    try {
      /*const microservice_options: TcpOptions = {
        transport: Transport.TCP,
        options: {
          host: process.env.MS_HOST || this.ms_host,
          port: Number(process.env.MS_PORT) || this.ms_port
        }
      };*/
      const options = {};
      if (!this.enable_log) {
        options['logger'] = false;
      }
      const app = await NestFactory.create(RootModule, options);
      //const microservice = app.connectMicroservice(microservice_options);

      this.buildAPIDocumentation(app);

      //await app.startAllMicroservices();
      await app.listen(process.env.PORT || this.port, process.env.HOST || this.host);

      Logger.log(
        `Environment: ${chalk
          .hex('#87e8de')
          .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`
      );

      process.env.NODE_ENV === 'production'
        ? Logger.log(
          `✅  Server ready at http://${this.host}:${chalk
            .hex('#87e8de')
            .bold(`${this.port}`)}`
        )
        : Logger.log(
          `✅  Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${this.port}`)}`
        );
    } catch (error) {
      Logger.error(`❌  Error starting server, ${error}`);
      process.exit();
    }
  }

  private buildAPIDocumentation(app): void {
    const title = 'Skillsly Auth Microservice';
    const description = 'Skillsly Auth Microservice API Documentation';
    const version = '1.0.0';
    const tag = 'social network';

    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag(tag)
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
