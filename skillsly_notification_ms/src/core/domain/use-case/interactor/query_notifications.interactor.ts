import { TransactionalInteractor } from '@core/common/use-case/transactional.interactor';
import QueryNotificationsInputModel from '../input-model/query_notifications.input_model';
import QueryNotificationsOutputModel from '../output-model/query_notifications.output_model';

export default interface QueryNotificationsInteractor
  extends TransactionalInteractor<
    QueryNotificationsInputModel,
    QueryNotificationsOutputModel
  > {}
