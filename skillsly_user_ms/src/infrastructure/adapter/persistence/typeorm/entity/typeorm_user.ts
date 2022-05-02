import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Gender } from '@core/domain/entity/type/gender.enum'
import { TypeOrmUserRelationship } from '@infrastructure/adapter/persistence/typeorm/entity/typeorm_user_relationship'

@Entity({
  schema: 'skillsly_user',
  name: 'user'
})
export class TypeOrmUser {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    nullable: false,
    primary: true
  })
  public id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: '125',
    nullable: false
  })
  public email: string;

  @Column({
    name: 'name',
    type: 'text',
    nullable: false
  })
  public name: string;

  @Column({
    name: 'date_of_birth',
    type: 'text',
    nullable: false
  })
  public date_of_birth: string;

  @Column({
    name: 'gender',
    type: 'text',
    nullable: false
  })
  public gender: Gender;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false
  })
  public created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true
  })
  public updated_at: Date;

  @OneToMany(
    () => TypeOrmUserRelationship,
    (user_relationship) => user_relationship.follower_id
  )
  public followers: Array<TypeOrmUserRelationship>;

  @OneToMany(
    () => TypeOrmUserRelationship,
    (user_relationship) => user_relationship.follower_id
  )
  public following_users: Array<TypeOrmUserRelationship>;
}
