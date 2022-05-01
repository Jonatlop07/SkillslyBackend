import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TypeOrmNotificationResource } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_notification_resource'

@Entity({
  schema: 'skillsly_notification',
  name: 'notification_change'
})
export class TypeORMNotificationChange {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'notification_resource_id',
    type: 'uuid',
    nullable: false
  })
  public notification_resource_id: string;

  @Column({
    name: 'actor_id',
    type: 'uuid',
    nullable: false
  })
  public actor_id: string;

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false
  })
  public status: number;

  @ManyToOne(
    () => TypeOrmNotificationResource,
    notification_resource => notification_resource.notification_changes
  )
  @JoinColumn({ name: 'notification_resource_id' })
  public notification_resource: TypeOrmNotificationResource;
}
