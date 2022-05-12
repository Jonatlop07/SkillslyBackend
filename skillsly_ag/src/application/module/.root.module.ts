import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InfrastructureModule } from '@application/module/infrastructure.module';
import { setEnvironment } from '@application/environments';
import { join } from 'path';
import { GraphQLError } from 'graphql'
import { AppModule } from '@application/module/app.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${setEnvironment()}`
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/application/schema.gql'),
        formatError: (error: GraphQLError) => {
          return error.toJSON();
        },
        context: ({ req, res }) => ({ req, res }),
        cors: {
          origin: '*',
          credentials: true
        }
      }
    ),
    InfrastructureModule,
    AppModule
  ]
})
export class RootModule {
}
