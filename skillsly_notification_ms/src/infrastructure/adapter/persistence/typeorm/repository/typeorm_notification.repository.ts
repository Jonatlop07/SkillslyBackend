import { TypeOrmNotification } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_notification'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(TypeOrmNotification)
export class TypeOrmNotificationRepository extends BaseRepository<TypeOrmNotification> {}
