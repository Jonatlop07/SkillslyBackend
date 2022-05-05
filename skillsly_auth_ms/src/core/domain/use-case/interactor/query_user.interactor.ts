import { Interactor } from '@core/common/use-case/interactor'
import QueryUserInputModel from '@core/domain/use-case/input-model/query_user.input_model'
import QueryUserOutputModel from '@core/domain/use-case/output-model/query_user.output_model'

export default interface QueryUserInteractor extends Interactor<QueryUserInputModel, QueryUserOutputModel> {}
