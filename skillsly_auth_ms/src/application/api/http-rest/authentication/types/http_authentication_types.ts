import { Request } from 'express';

export type HttpUserPayload = {
  id: string,
  email: string,
  is_two_factor_auth_enabled?: boolean
};

export type HttpRequestWithUser = Request & { user: HttpUserPayload };

export type HttpJwtPayload = {
  id: string,
  is_two_factor_authenticated?: boolean
};

export type HttpLoggedInUser = {
  id?: string,
  email?: string,
  access_token: string,
};
