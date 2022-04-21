import { IsEmail, IsOptional, IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator'

export class UpdateUserAccountDTO {
  @IsEmail()
  @IsOptional()
  @ApiModelProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  public name: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  public date_of_birth: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  public gender: string;
}
