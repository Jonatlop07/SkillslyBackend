import { User } from '@core/domain/entity/user';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';

export class UserMapper {
  public static toUserDTO(from: User): UserDTO {
    return {
      id: from.id,
      email: from.email,
      password: from.password,
      access_token: from.access_token,
      two_factor_auth_secret: from.two_factor_auth_secret,
      updated_at: from.updated_at,
      is_two_factor_auth_enabled: from.is_two_factor_auth_enabled,
      reset_password_token: from.reset_password_token
    };
  }

  public static toUser(from: UserDTO): User {
    return new User({
      id: from.id,
      email: from.email,
      password: from.password,
      access_token: from.access_token,
      two_factor_auth_secret: from.two_factor_auth_secret,
      updated_at: from.updated_at,
      is_two_factor_auth_enabled: from.is_two_factor_auth_enabled,
      reset_password_token: from.reset_password_token
    });
  }
}
