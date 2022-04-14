import { CoreExceptionCodes } from '@core/common/exception/core_exception_codes';

abstract class FollowUserRequestException extends Error {}

class FollowUserRequestAlreadyExistsException extends FollowUserRequestException {
  code = CoreExceptionCodes.USER_FOLLOW_REQUEST_ALREADY_EXISTS;
  message = 'The follow request already exists';
}

class FollowUserRequestNotFoundException extends FollowUserRequestException {
  code = CoreExceptionCodes.NON_EXISTENT_FOLLOW_USER_REQUEST;
  message = 'The follow request does not exists';
}

class FollowUserRequestInvalidDataFormatException extends FollowUserRequestException {
  code = CoreExceptionCodes.INVALID_FORMAT_FOLLOW_USER_REQUEST;
  message = 'The follow request has invalid format';
}

class FollowUserRelationshipNotFoundException extends FollowUserRequestException {
  code = CoreExceptionCodes.NON_EXISTENT_USER_FOLLOW_RELATIONSHIP;
  message = 'The follow relationship does not exists';
}

export {
  FollowUserRequestException,
  FollowUserRequestAlreadyExistsException,
  FollowUserRequestNotFoundException,
  FollowUserRequestInvalidDataFormatException,
  FollowUserRelationshipNotFoundException
};
