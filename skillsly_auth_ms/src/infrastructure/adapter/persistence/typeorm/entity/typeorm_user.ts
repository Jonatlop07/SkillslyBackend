import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  schema: 'skillsly_auth',
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
    name: 'password',
    type: 'text',
    nullable: false
  })
  public password: string;

  @Column({
    name: 'access_token',
    type: 'text',
    nullable: true
  })
  public access_token: string;

  @Column({
    name: 'two_factor_auth_secret',
    type: 'text',
    nullable: true
  })
  public two_factor_auth_secret: string;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true
  })
  public updated_at: Date;

  @Column({
    name: 'is_two_factor_auth_enabled',
    type: 'boolean',
    nullable: false
  })
  public is_two_factor_auth_enabled: boolean;

  @Column({
    name: 'reset_password_token',
    type: 'text',
    nullable: true
  })
  public reset_password_token: string;
}
