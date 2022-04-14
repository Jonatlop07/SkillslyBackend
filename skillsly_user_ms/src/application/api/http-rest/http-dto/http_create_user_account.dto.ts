import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator'

export class CreateUserAccountDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public name: string;

  @IsDate()
  @IsNotEmpty()
  @ApiModelProperty()
  public date_of_birth: Date;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public gender: string;
}
