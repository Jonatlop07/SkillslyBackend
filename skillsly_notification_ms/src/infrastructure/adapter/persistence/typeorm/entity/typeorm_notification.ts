import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { TypeOrmNotificationResource } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_notification_resource'

@Entity({
  schema: 'skillsly_notification',
  name: 'notification'
})
export class TypeOrmNotification {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'notification_resource_id',
    type: 'uuid',
    nullable: false
  })
  public notification_resource_id: string;

  @Column({
    name: 'notifier_id',
    type: 'uuid',
    nullable: false
  })
  public notifier_id: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false
  })
  public status: number;

  @ManyToOne(
    () => TypeOrmNotificationResource,
      notification_resource => notification_resource.notifications
  )
  @JoinColumn({ name: 'notification_resource_id' })
  public notification_resource: TypeOrmNotificationResource;
}
