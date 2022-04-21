import { get } from 'env-var';

export class APIServerConfiguration {
  public static readonly HOST: string = get('API_HOST').required().asString();

  public static readonly PORT: number = get('API_PORT')
    .required()
    .asPortNumber();

  public static readonly MS_HOST: string = get('MS_HOST').required().asString();

  public static readonly MS_PORT: number = get('MS_PORT')
    .required()
    .asPortNumber();

  public static readonly ENABLE_LOG: boolean = get('API_ENABLE_LOG')
    .required()
    .asBool();
}
