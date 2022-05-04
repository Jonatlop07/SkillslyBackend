import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiModelProperty()
  public access_token: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  public two_factor_auth_secret: string;

  @IsBoolean()
  @IsOptional()
  @ApiModelProperty()
  public is_two_factor_auth_enabled: boolean;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  public reset_password_token: string;
}
