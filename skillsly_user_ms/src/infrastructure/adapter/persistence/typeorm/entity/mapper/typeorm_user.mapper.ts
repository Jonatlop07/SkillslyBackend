import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user'
import { Logger } from '@nestjs/common'

export class TypeOrmUserMapper {
  public static toDTO(orm_user: TypeOrmUser): UserDTO {
    const {
      id, email, name, date_of_birth, gender,
      created_at, updated_at
    } = orm_user;
    return {
      id, email, name, date_of_birth, gender,
      created_at, updated_at
    };
  }
}
