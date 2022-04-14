import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';

export class TypeOrmUserMapper {
  public static toDTO(orm_user: TypeOrmUser): UserDTO {
    const {
      id, email, password, access_token, two_factor_auth_secret,
      is_two_factor_auth_enabled, updated_at, reset_password_token
    } = orm_user;
    return {
      id, email, password, access_token, two_factor_auth_secret,
      is_two_factor_auth_enabled, updated_at, reset_password_token
    };
  }
}
