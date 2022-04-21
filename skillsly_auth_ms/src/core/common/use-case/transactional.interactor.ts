import { Interactor } from '@core/common/use-case/interactor';

export interface TransactionalInteractor<InputModel, OutputModel> extends Interactor<InputModel, OutputModel> {
  onCommit?: (result: OutputModel, input: InputModel) => Promise<void>;
  onRollback?: (error: Error, input: InputModel) => Promise<void>
}
