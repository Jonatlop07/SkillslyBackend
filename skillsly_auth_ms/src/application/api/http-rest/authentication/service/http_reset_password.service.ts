import { Inject, Injectable, Logger } from '@nestjs/common';
import generateHashedPassword from '@core/common/util/validator/generate_hashed_password';
import { ResetPasswordDTO } from '@application/api/http-rest/authentication/types/reset_password.dto';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import { RequestResetPasswordDTO } from '@application/api/http-rest/authentication/types/request_reset_password.dto';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import { MailerService } from '@nestjs-modules/mailer';
import {
  InvalidCredentialsFormatException,
  UserNotFoundException,
} from '@core/domain/use-case/exception/auth.exception';
import { v4 } from 'uuid';
import { UserMapper } from '@core/domain/use-case/mapper/user.mapper';
import UpdateCredentialsGateway from '@core/domain/use-case/gateway/update_credentials.gateway';

@Injectable()
export class HttpResetPasswordService {
  private readonly logger: Logger = new Logger(HttpResetPasswordService.name);

  constructor(
    private readonly mailerService: MailerService,
    @Inject(UserDITokens.UserRepository)
    private readonly update_gateway: UpdateCredentialsGateway
  ) {}

  public async requestResetPassword(
    requestResetPasswordDTO: RequestResetPasswordDTO,
  ): Promise<void> {
    const { email } = requestResetPasswordDTO;
    const resulting_user: UserDTO = await this.update_gateway.findOne({
      email,
    });
    if (!resulting_user) {
      throw new UserNotFoundException();
    }
    const token = v4();
    await this.update_gateway.partialUpdate(
      {
        email,
      },
      {
        reset_password_token: token,
      },
    );
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'skillsly_team@skillsly.com',
        subject: 'Request Reset Password Skillsly',
        text: 'Skillsly',

        html:
          '<b> Porfavor ingrese al siguiente enlace para recuperar su contraseña:</b>' +
          `<a href="${process.env.ORIGIN}/reset-password/${token}" target="_blank"> Recuperador de contraseñas Skillsly</a>`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  public async resetPassword(
    resetPasswordDTO: ResetPasswordDTO,
  ): Promise<void> {
    const { reset_password_token, password } = resetPasswordDTO;
    const resulting_user_dto: UserDTO = await this.update_gateway.findOne({
      reset_password_token,
    });
    if (!resulting_user_dto) {
      throw new UserNotFoundException();
    }
    const resulting_user = UserMapper.toUser(resulting_user_dto);
    if (!resulting_user.hasValidPassword()) {
      throw new InvalidCredentialsFormatException ();
    }
    const email = resulting_user_dto.email;
    await this.update_gateway.partialUpdate(
      {
        email,
      },
      {
        password: generateHashedPassword(password),
        reset_password_token: null,
      },
    );
  }
}
