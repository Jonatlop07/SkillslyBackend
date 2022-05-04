import { Request } from 'express';

export type GraphQLUserPayload = {
  id: string,
  email: string,
  is_two_factor_auth_enabled?: boolean
};

export type GraphQLRequestWithUser = Request & { user: GraphQLUserPayload };

export type GraphQLJwtPayload = {
  id: string,
  is_two_factor_authenticated?: boolean
};

export type GraphQLLoggedInUser = {
  id?: string,
  email?: string,
  access_token: string,
};

export type GraphQLTFALoggedInUser = {
  id: string,
  email: string,
  access_token: string,
  is_two_factor_auth_enabled: boolean
};
