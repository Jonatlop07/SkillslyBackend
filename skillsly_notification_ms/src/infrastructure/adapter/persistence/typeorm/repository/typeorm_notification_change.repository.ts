import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { TypeORMNotificationChange } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_notification_change'
import { EntityRepository } from 'typeorm'

@EntityRepository(TypeORMNotificationChange)
export class TypeOrmNotificationChangeRepository extends BaseRepository<TypeORMNotificationChange> {}
