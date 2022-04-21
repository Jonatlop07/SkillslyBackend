import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FollowRequestStatus } from '@infrastructure/adapter/persistence/typeorm/entity/follow_request_status.enum'
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user'

@Entity({
  schema: 'skillsly_user',
  name: 'user_relationship'
})
export class TypeOrmUserRelationship {
  @PrimaryColumn({
    name: 'follower_id',
    type: 'uuid',
    nullable: false,
    primary: true
  })
  public follower_id: string;

  @PrimaryColumn({
    name: 'following_id',
    type: 'uuid',
    nullable: false,
    primary: true
  })
  public following_id: string;

  @Column({
    name: 'status',
    type: 'text',
    nullable: false
  })
  public status: FollowRequestStatus;

  @Column({
    name: 'accepted_at',
    type: 'timestamptz',
    nullable: true
  })
  public accepted_at: Date;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn({ name: 'follower_id' })
  public follower: TypeOrmUser;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn({ name: 'following_id' })
  public following: TypeOrmUser;
}
