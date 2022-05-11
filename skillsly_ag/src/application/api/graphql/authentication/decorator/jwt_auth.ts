import { applyDecorators, UseGuards } from '@nestjs/common';
import { GraphQLJwtAuthenticationGuard } from '@application/api/graphql/authentication/guard/graphql_jwt_authentication.guard';

export const JwtAuth = (): ((...args: any) => void) => {
  return applyDecorators(UseGuards(GraphQLJwtAuthenticationGuard));
};
