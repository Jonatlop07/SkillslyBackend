import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateNotificationDTO {
  @IsString()
  @IsNotEmpty()
  public resource_type: string;

  @IsString()
  @IsNotEmpty()
  public entity_id: string;

  @IsString()
  @IsNotEmpty()
  public actor_id: string;

  @IsArray()
  public notifier_ids: Array<string>;
}
