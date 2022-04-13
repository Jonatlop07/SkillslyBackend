import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CoreException } from '@core/common/exception/core.exception';
import { CoreExceptionCodes } from '@core/common/exception/core_exception_codes';

export class HttpExceptionMapper {
  private static http_exceptions = {
    not_found: {
      mappings: new Set([
        CoreExceptionCodes.USER_NOT_FOUND
      ]),
      status_code: HttpStatus.NOT_FOUND
    },
    bad_request: {
      mappings: new Set([
        CoreExceptionCodes.INVALID_CREDENTIALS_FORMAT
      ]),
      status_code: HttpStatus.BAD_REQUEST
    },
    conflict: {
      mappings: new Set([
        CoreExceptionCodes.USER_ALREADY_EXISTS
      ]),
      status_code: HttpStatus.CONFLICT
    },
    unauthorized: {
      mappings: new Set([
        CoreExceptionCodes.INVALID_CREDENTIALS
      ]),
      status_code: HttpStatus.UNAUTHORIZED
    },
    forbidden: {
      mappings: new Set([]),
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
