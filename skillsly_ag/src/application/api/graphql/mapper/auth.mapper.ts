import { GraphQLLoggedInUser } from '@application/api/graphql/authentication/types/graphql_authentication_types';
import { AuthPayload } from '@application/api/graphql/model/auth/auth_payload';

export class AuthMapper {
  public static toGraphQLModel(payload: GraphQLLoggedInUser): AuthPayload {
    const { id, email, access_token } = payload;
    return {
      id,
      email,
      access_token
    };
  }
}
