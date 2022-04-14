import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator'

export class UpdateUserAccountDTO {
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsString()
  @ApiModelProperty()
  public name: string;

  @IsDate()
  @ApiModelProperty()
  public date_of_birth: Date;

  @IsString()
  @ApiModelProperty()
  public gender: string;
}
