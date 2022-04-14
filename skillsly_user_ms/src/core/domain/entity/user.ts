import { Entity } from '@core/common/entity/entity'
import { CreateUserEntityPayload } from '@core/domain/entity/type/create_user_entity_payload'
import { Nullable } from '@core/common/type/common_types'
import { Gender } from '@core/domain/entity/type/gender.enum'

export class User extends Entity {
  private readonly _email: string;
  private readonly _name: string;
  private readonly _date_of_birth: Date;
  private readonly _gender: Gender;
  private readonly _created_at: Nullable<Date>;
  private readonly _updated_at: Nullable<Date>;

  constructor(payload: CreateUserEntityPayload) {
    super();
    const {
      id, email, name, date_of_birth,
      gender, created_at, updated_at
    } = payload;
    this._id = id;
    this._email = email;
    this._name = name;
    this._date_of_birth = date_of_birth;
    this._gender = gender;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  public hasValidEmail(): boolean {
    return this._email && /^[_A-Za-z0-9-\\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
      .test(this._email);
  }

  public hasValidName(): boolean {
    const MAX_NAME_LENGTH = 30;
    return this._name && this._name !== '' && this._name.length <= MAX_NAME_LENGTH;
  }

  public hasValidDateOfBirth() {
    return this._date_of_birth && this._date_of_birth.getUTCDate() < Date.now();
  }

  public hasValidGender() {
    return this._gender && Object.values(Gender).includes(this._gender as Gender);
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get date_of_birth(): Date {
    return this._date_of_birth;
  }

  get gender(): Gender {
    return this._gender;
  }

  get created_at(): Nullable<Date> {
    return this._created_at;
  }

  get updated_at(): Nullable<Date> {
    return this._updated_at;
  }
}
