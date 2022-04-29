import { Inject, Injectable, Logger } from '@nestjs/common'
import { PartialUserUpdateDTO } from '@core/domain/use-case/account/persistence/partial_user_update.dto'
import UserRepository from '@core/domain/use-case/common/repository/user.repository'
import { Optional } from '@core/common/type/common_types'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import { TypeOrmUserMapper } from '@infrastructure/adapter/persistence/typeorm/entity/mapper/typeorm_user.mapper'
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens'
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user'
import { TypeOrmUserRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository'
import { PaginationDTO } from '@core/common/persistence/pagination.dto'

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
        ...user_dto,
        created_at: new Date()
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
      where: { ...params }
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
      updated_at: new Date()
    });
  }

  public async findAll(params: UserQueryModel, pagination: PaginationDTO): Promise<UserDTO[]> {
    const { name, email } = params;
    const [users]: [Array<TypeOrmUser>, number] = await this.repository.findAndCount({
      where: [
        { name },
        { email }
      ],
      take: pagination.limit,
      skip: pagination.offset
    });
    return users.map(TypeOrmUserMapper.toDTO);
  }
}
