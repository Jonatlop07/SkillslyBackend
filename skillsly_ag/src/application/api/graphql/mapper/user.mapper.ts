import { UserModel } from '@application/common/model/user.model'
import { User } from '@application/api/graphql/model/user/user'

export class UserMapper {
  public static toGraphQLModel(user: UserModel): User {
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
