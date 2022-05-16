import { get } from 'env-var';

export class APIServerConfiguration {
  public static readonly MS_HOST: string = get('MS_HOST').required().asString();

  public static readonly MS_PORT: number = get('MS_PORT')
    .required()
    .asPortNumber();

  public static readonly ENABLE_LOG: boolean = get('API_ENABLE_LOG')
    .required()
    .asBool();

  public static readonly MQ_PROTOCOL: string = get('MQ_PROTOCOL').required().asString();

  public static readonly MQ_HOST: string = get('MQ_HOST').required().asString();

  public static readonly MQ_PORT: number = get('MQ_PORT')
    .required()
    .asPortNumber();

  public static readonly MQ_USERNAME: string = get('MQ_USERNAME').required().asString();

  public static readonly MQ_PASSWORD: string = get('MQ_PASSWORD').required().asString();

  public static readonly MQ_QUEUE: string = get('MQ_QUEUE').required().asString();
}
