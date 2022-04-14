import { Inject, Injectable, Logger } from '@nestjs/common';
import UserRepository from '@core/domain/use-case/repository/user.repository';
import { TypeOrmUserRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import UserQueryModel from '@core/domain/use-case/query-model/user.query_model';
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user';
import { TypeOrmUserMapper } from '@infrastructure/adapter/persistence/typeorm/entity/mapper/typeorm_user.mapper';
import { Optional } from '@core/common/type/common_types';
import { PartialUserUpdateDTO } from '@core/domain/use-case/persistence/partial_user_update';

@Injectable()
export class TypeOrmUserRepositoryAdapter implements UserRepository {
  private readonly logger: Logger = new Logger(TypeOrmUserRepositoryAdapter.name);

  constructor(
    @Inject(TypeOrmDITokens.UserRepository)
    private readonly repository: TypeOrmUserRepository
  ) {}

  public async create(user_dto: UserDTO): Promise<UserDTO> {
    const user: TypeOrmUser = await this.repository.save(
      this.repository.create({
        ...user_dto
      })
    );
    return TypeOrmUserMapper.toDTO(user);
  }

  public async exists(params: UserQueryModel): Promise<boolean> {
    return !!await this.findOne(params);
  }

  public async delete(params: UserQueryModel): Promise<Optional<UserDTO> | void> {
    await this.repository.delete(params);
  }

  public async findOne(params: UserQueryModel): Promise<Optional<UserDTO>> {
    const existing_user: TypeOrmUser = await this.repository.findOne({
      where: params
    });
    if (existing_user)
      return TypeOrmUserMapper.toDTO(existing_user);
    return undefined;
  }

  public async partialUpdate(params: UserQueryModel, updates: PartialUserUpdateDTO): Promise<UserDTO> {
    const user: UserDTO = await this.repository.findOne(params);
    return await this.create({
      ...user,
      ...updates,
      updated_at: updates.email && updates.password ? new Date() : null
    });
  }
}
