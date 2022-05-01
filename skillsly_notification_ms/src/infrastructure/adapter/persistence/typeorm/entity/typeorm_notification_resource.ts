import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TypeOrmNotification } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_notification'
import { TypeORMNotificationChange } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_notification_change'

@Entity({
  schema: 'skillsly_notification',
  name: 'notification_resource'
})
export class TypeOrmNotificationResource {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    name: 'resource_type',
    type: 'text',
    nullable: false
  })
  public resource_type: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false
  })
  public created_at: Date;

  @Column({
    name: 'status',
    type: 'smallint',
    nullable: false
  })
  public status: number;

  @OneToMany(
    () => TypeOrmNotification,
    (notification) => notification.notification_resource_id
  )
  public notifications: Array<TypeOrmNotification>;

  @OneToMany(
    () => TypeORMNotificationChange,
    (notification_change) => notification_change.notification_resource_id
  )
  public notification_changes: Array<TypeORMNotificationChange>;
}
