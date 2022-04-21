import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CoreException } from '@core/common/exception/core.exception';
import { CoreExceptionCodes } from '@core/common/exception/core_exception_codes'

export class HttpExceptionMapper {
  private static http_exceptions = {
    not_found: {
      mappings: new Set([
        CoreExceptionCodes.NON_EXISTENT_USER
      ]),
      status_code: HttpStatus.NOT_FOUND
    },
    bad_request: {
      mappings: new Set([
        CoreExceptionCodes.NON_EXISTENT_FOLLOW_USER_REQUEST,
        CoreExceptionCodes.NON_EXISTENT_USER_FOLLOW_RELATIONSHIP
      ]),
      status_code: HttpStatus.BAD_REQUEST
    },
    conflict: {
      mappings: new Set([
        CoreExceptionCodes.ACCOUNT_ALREADY_EXISTS,
        CoreExceptionCodes.USER_FOLLOW_REQUEST_ALREADY_EXISTS
      ]),
      status_code: HttpStatus.CONFLICT
    },
    unauthorized: {
      mappings: new Set([]),
      status_code: HttpStatus.UNAUTHORIZED
    },
    forbidden: {
      mappings: new Set([
        CoreExceptionCodes.INVALID_ACCOUNT_DATA_FORMAT,
        CoreExceptionCodes.INVALID_FORMAT_FOLLOW_USER_REQUEST
      ]),
      status_code: HttpStatus.FORBIDDEN,
    }
  }

  private static getHttpException(status: number, error: string) {
    return new HttpException({
      status,
      error,
    }, status);
  }

  public static toHttpException(exception: CoreException) {
    Logger.error(exception.stack || exception.message);
    if (exception.code) {
      for (const exception_type of Object.keys(this.http_exceptions)) {
        if (this.http_exceptions[exception_type].mappings.has(exception.code)) {
          return this.getHttpException(
            this.http_exceptions[exception_type].status_code,
            exception.message,
          );
        }
      }
    }
    return this.getHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
}
