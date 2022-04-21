import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator'

export class CreateUserAccountDTO {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public id: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public date_of_birth: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public gender: string;
}
