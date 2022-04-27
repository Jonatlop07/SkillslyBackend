import { UserModel } from '@application/common/model/user.model'
import { Id } from '@application/common/type/common_types'

export class UserMapper {
  public static toGraphQLModel(user: UserModel) {
    const {
      id,
      email,
      name,
      date_of_birth,
      gender,
      created_at,
      updated_at,
    } = user;
    return {
      id,
      email,
      name,
      date_of_birth,
      gender,
      created_at,
      updated_at
    }
  }
}
