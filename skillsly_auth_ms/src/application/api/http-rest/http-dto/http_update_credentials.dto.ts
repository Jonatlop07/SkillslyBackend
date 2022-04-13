import { IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateCredentialsDTO {
  @IsString()
  @ApiModelProperty()
  public readonly id: string;

  @IsEmail()
  @ApiModelProperty()
  public readonly email: string;

  @ApiModelProperty()
  public password: string;
}
