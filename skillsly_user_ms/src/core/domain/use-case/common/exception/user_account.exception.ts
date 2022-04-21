import { CoreExceptionCodes } from '@core/common/exception/core_exception_codes';
import { CoreException } from '@core/common/exception/core.exception';

abstract class UserAccountException extends CoreException {}

class UserAccountAlreadyExistsException extends UserAccountException {
  code = CoreExceptionCodes.ACCOUNT_ALREADY_EXISTS;
  message = 'Tried to create an account that already exists';
}

class UserAccountInvalidDataFormatException extends UserAccountException {
  code = CoreExceptionCodes.INVALID_ACCOUNT_DATA_FORMAT;
  message = 'Invalid account data format';
}

class UserAccountNotFoundException extends UserAccountException {
  code = CoreExceptionCodes.NON_EXISTENT_USER;
  message = 'The user does not exists';
}

export {
  UserAccountException,
  UserAccountAlreadyExistsException,
  UserAccountInvalidDataFormatException,
  UserAccountNotFoundException
};
