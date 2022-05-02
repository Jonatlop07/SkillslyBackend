import { Id } from '@application/common/type/common_types';

export default interface QueryNotificationsRequestInput {
  notifier_id: Id;
  limit?: number;
  offset?: number;
}
