import CreateNotificationInputModel from '@core/domain/use-case/input-model/create_notification.input_model'
import CreateNotificationOutputModel from '@core/domain/use-case/output-model/create_notification.output_model'
import { TransactionalInteractor } from '@core/common/use-case/transactional.interactor'

export default interface CreateNotificationInteractor
  extends TransactionalInteractor<CreateNotificationInputModel, CreateNotificationOutputModel> {}
