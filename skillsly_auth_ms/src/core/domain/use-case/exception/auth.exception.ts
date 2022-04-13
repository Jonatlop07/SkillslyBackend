import { CoreExceptionCodes } from '@core/common/exception/core_exception_codes';
import { CoreException } from '@core/common/exception/core.exception';

abstract class AuthException extends CoreException {}

class UserAlreadyExistsException extends AuthException {
  code = CoreExceptionCodes.USER_ALREADY_EXISTS;
  message = 'Tried to create an user that already exists';
}

class InvalidCredentialsFormatException extends AuthException {
  code = CoreExceptionCodes.INVALID_CREDENTIALS_FORMAT;
  message = 'Invalid credentials format';
}

class InvalidCredentialsException extends AuthException {
  code = CoreExceptionCodes.INVALID_CREDENTIALS;
  message = 'Provided invalid credentials';
}

class UserNotFoundException extends AuthException {
  code = CoreExceptionCodes.USER_NOT_FOUND;
  message = 'User not found'
}

export {
  UserAlreadyExistsException,
  InvalidCredentialsFormatException,
  InvalidCredentialsException,
  UserNotFoundException
};
