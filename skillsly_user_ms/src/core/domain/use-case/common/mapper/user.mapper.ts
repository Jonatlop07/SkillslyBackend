import { User } from '@core/domain/entity/user'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export class UserMapper {
  public static toUserDTO(from: User): UserDTO {
    return {
      id: from.id,
      email: from.email,
      name: from.name,
      date_of_birth: from.date_of_birth,
      gender: from.gender,
      created_at: from.created_at,
      updated_at: from.updated_at
    };
  }

  public static toUser(from: UserDTO): User {
    return new User({
      id: from.id,
      email: from.email,
      name: from.name,
      date_of_birth: from.date_of_birth,
      gender: from.gender,
      created_at: from.created_at,
      updated_at: from.updated_at
    });
  }
}
