import { Id, Optional } from '@core/common/type/common_types';

export class Entity {
  protected _id: Optional<Id>;

  public get id(): Optional<Id> {
    return this._id;
  }
}
