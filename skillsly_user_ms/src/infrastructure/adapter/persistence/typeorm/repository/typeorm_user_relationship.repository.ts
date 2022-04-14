import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';
import { TypeOrmUserRelationship } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user_relationship'

@EntityRepository(TypeOrmUserRelationship)
export class TypeOrmUserRelationshipRepository extends BaseRepository<TypeOrmUserRelationship> {}
