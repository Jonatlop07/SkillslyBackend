import { Inject, Injectable, Logger } from '@nestjs/common';
import { TypeOrmDITokens } from '@infrastructure/adapter/persistence/typeorm/di/typeorm_di_tokens';
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto';
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model';
import { Optional } from '@core/common/type/common_types';
import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto';
import FollowRequestCollectionDTO from '@core/domain/use-case/follow_request/dto/follow_request_collection.dto';
import UserRelationshipRepository from '@core/domain/use-case/follow_request/repository/user_relationship.repository';
import { TypeOrmUserRelationshipRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user_relationship.repository';
import { TypeOrmUserRepository } from '@infrastructure/adapter/persistence/typeorm/repository/typeorm_user.repository';
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user';
import { TypeOrmUserMapper } from '@infrastructure/adapter/persistence/typeorm/entity/mapper/typeorm_user.mapper';
import { TypeOrmUserRelationship } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user_relationship';
import { FollowRequestStatus } from '@infrastructure/adapter/persistence/typeorm/entity/follow_request_status.enum';
import { SearchedUserDTO } from '@core/domain/use-case/search/dto/searched_user.dto';

@Injectable()
export class TypeOrmUserRelationshipRepositoryAdapter implements UserRelationshipRepository {
  private readonly logger: Logger = new Logger(TypeOrmUserRelationshipRepositoryAdapter.name);

  constructor(
    @Inject(TypeOrmDITokens.UserRelationshipRepository)
    private readonly relationship_repository: TypeOrmUserRelationshipRepository,
    @Inject(TypeOrmDITokens.UserRepository)
    private readonly user_repository: TypeOrmUserRepository,
  ) {
  }

  public async createFollowUserRequest(params: FollowRequestDTO): Promise<void> {
    await this.relationship_repository.save(
      this.relationship_repository.create({
        follower_id: params.user_that_requests_id,
        following_id: params.user_to_follow_id,
        status: FollowRequestStatus.Pending,
      }),
    );
  }

  public async acceptFollowUserRequest(params: FollowRequestDTO): Promise<void> {
    const relationship: TypeOrmUserRelationship = await this.relationship_repository.findOne({
      where: {
        follower_id: params.user_that_requests_id,
        following_id: params.user_to_follow_id,
      },
    });
    await this.relationship_repository.save(
      this.relationship_repository.create({
        ...relationship,
        status: FollowRequestStatus.Following,
        accepted_at: new Date(),
      }),
    );
  }

  public async deleteUserRelationship(params: FollowRequestDTO): Promise<void> {
    await this.relationship_repository.delete({
      follower_id: params.user_that_requests_id,
      following_id: params.user_to_follow_id,
    });
  }

  public async rejectFollowUserRequest(params: FollowRequestDTO): Promise<void> {
    await this.deleteUserRelationship(params);
  }

  public async existsFollowUserRelationship(params: FollowRequestDTO): Promise<boolean> {
    const relationship: TypeOrmUserRelationship = await this.relationship_repository.findOne({
      where: {
        follower_id: params.user_that_requests_id,
        following_id: params.user_to_follow_id,
        status: FollowRequestStatus.Following as string
      },
    });
    return !!relationship;
  }

  public async existsFollowUserRequest(params: FollowRequestDTO): Promise<boolean> {
    const relationship: TypeOrmUserRelationship = await this.relationship_repository.findOne({
      where: {
        follower_id: params.user_that_requests_id,
        following_id: params.user_to_follow_id,
        status: FollowRequestStatus.Pending as string
      },
    });
    return !!relationship;
  }

  public async getFollowUserRequestCollection(id: string): Promise<FollowRequestCollectionDTO> {
    const pending_followers: Array<TypeOrmUserRelationship> = await this.relationship_repository.find({
      where: {
        following_id: id,
        status: FollowRequestStatus.Pending as string,
      },
      relations: ['follower']
    });
    const pending_users_to_follow: Array<TypeOrmUserRelationship> = await this.relationship_repository.find({
      where: {
        follower_id: id,
        status: FollowRequestStatus.Pending as string,
      },
      relations: ['following']
    });
    const followers: Array<TypeOrmUserRelationship> = await this.relationship_repository.find({
      where: {
        following_id: id,
        status: FollowRequestStatus.Following as string,
      },
      relations: ['follower']
    });
    const following_users: Array<TypeOrmUserRelationship> = await this.relationship_repository.find({
      where: {
        follower_id: id,
        status: FollowRequestStatus.Following as string,
      },
      relations: ['following']
    });
    return {
      pending_followers: pending_followers.map(
        (user_relationship: TypeOrmUserRelationship) =>
          TypeOrmUserMapper.toDTO(user_relationship.follower) as SearchedUserDTO,
      ),
      pending_users_to_follow: pending_users_to_follow.map(
        (user_relationship: TypeOrmUserRelationship) =>
          TypeOrmUserMapper.toDTO(user_relationship.following) as SearchedUserDTO,
      ),
      followers: followers.map(
        (user_relationship: TypeOrmUserRelationship) =>
          TypeOrmUserMapper.toDTO(user_relationship.follower) as SearchedUserDTO,
      ),
      following_users: following_users.map(
        (user_relationship: TypeOrmUserRelationship) =>
          TypeOrmUserMapper.toDTO(user_relationship.following) as SearchedUserDTO,
      ),
    };
  }

  public async exists(params: UserQueryModel): Promise<boolean> {
    return !!await this.findOne(params);
  }

  public async findOne(params: UserQueryModel): Promise<Optional<UserDTO>> {
    const existing_user: TypeOrmUser = await this.user_repository.findOne({
      where: { ...params },
    });
    if (existing_user)
      return TypeOrmUserMapper.toDTO(existing_user);
    return undefined;
  }
}
