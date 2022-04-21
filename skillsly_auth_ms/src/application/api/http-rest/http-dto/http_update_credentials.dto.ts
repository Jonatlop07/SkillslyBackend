import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateCredentialsDTO {
  @IsEmail()
  @IsOptional()
  @ApiModelProperty()
  public readonly email: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  public password: string;
}
