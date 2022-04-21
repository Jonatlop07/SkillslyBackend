import QueryUserAccountInputModel from '@core/domain/use-case/account/input-model/query_user_interactor.input_model'
import { Interactor } from '@core/common/use-case/interactor'
import QueryUserAccountOutputModel from '@core/domain/use-case/account/output-model/query_user_interactor.output_model'

export interface QueryUserAccountInteractor extends Interactor<QueryUserAccountInputModel, QueryUserAccountOutputModel> {}
