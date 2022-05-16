import { TFAuthPayload } from '@application/api/graphql/model/auth/tf_auth_payload';
import { GraphQLTFALoggedInUser } from '@application/api/graphql/authentication/types/graphql_authentication_types';

export class TFAuthMapper {
  public static toGraphQLModel(payload: GraphQLTFALoggedInUser): TFAuthPayload {
    const { id, email, access_token, is_two_factor_auth_enabled } = payload;
    return { id, email, access_token, is_two_factor_auth_enabled };
  }
}
