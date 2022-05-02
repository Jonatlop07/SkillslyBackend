import { runOnTransactionCommit, runOnTransactionRollback, Transactional } from 'typeorm-transactional-cls-hooked';
import { Interactor } from '@core/common/use-case/interactor'
import { TransactionalInteractor } from '@core/common/use-case/transactional.interactor'

export class TransactionalUseCaseWrapper<InputModel, OutputModel> implements Interactor<InputModel, OutputModel> {
  constructor(
    private readonly interactor: TransactionalInteractor<InputModel, OutputModel>,
  ) {}

  @Transactional()
  public async execute(input: InputModel): Promise<OutputModel> {
    runOnTransactionRollback(async (error: Error) => this.interactor.onRollback?.(error, input));
    const result: OutputModel = await this.interactor.execute(input);
    runOnTransactionCommit(async () => this.interactor.onCommit?.(result, input));
    return result;
  }
}
