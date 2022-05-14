import { Entity } from '@core/common/entity/entity';
import { CreateUserEntityPayload } from '@core/domain/entity/type/create_user_entity_payload';
import { Nullable } from '@core/common/type/common_types'

export class User extends Entity {
  private readonly _email: string;
  private readonly _password: string;
  private readonly _access_token: Nullable<string>;
  private readonly _two_factor_auth_secret: Nullable<string>;
  private readonly _updated_at: Nullable<Date>;
  private readonly _is_two_factor_auth_enabled: boolean;
  private readonly _reset_password_token: Nullable<string>;

  constructor(payload: CreateUserEntityPayload) {
    super();
    const {
      id, email, password, access_token,
      two_factor_auth_secret, updated_at,
      is_two_factor_auth_enabled, reset_password_token
    } = payload;
    this._id = id;
    this._email = email;
    this._password = password;
    this._access_token = access_token;
    this._two_factor_auth_secret = two_factor_auth_secret;
    this._updated_at = updated_at;
    this._is_two_factor_auth_enabled = is_two_factor_auth_enabled;
    this._reset_password_token = reset_password_token;
  }

  public hasValidEmail(): boolean {
    return /^[_A-Za-z0-9-\\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
      .test(this._email);
  }

  public hasValidPassword(): boolean {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~_]).{8,}$/
      .test(this._password);
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get access_token(): Nullable<string> {
    return this._access_token;
  }

  get two_factor_auth_secret(): Nullable<string> {
    return this._two_factor_auth_secret;
  }

  get updated_at(): Nullable<Date> {
    return this._updated_at;
  }

  get is_two_factor_auth_enabled(): boolean {
    return this._is_two_factor_auth_enabled;
  }

  get reset_password_token(): Nullable<string> {
    return this._reset_password_token;
  }
}
