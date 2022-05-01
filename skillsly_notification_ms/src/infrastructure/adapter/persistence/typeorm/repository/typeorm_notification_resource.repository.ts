import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { TypeOrmNotificationResource } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_notification_resource'
import { EntityRepository } from 'typeorm'

@EntityRepository(TypeOrmNotificationResource)
export class TypeOrmNotificationResourceRepository extends BaseRepository<TypeOrmNotificationResource> {}
