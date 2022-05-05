import RequestResetPasswordInteractor from '@core/domain/use-case/interactor/request_reset_password.interactor'
import RequestResetPasswordInputModel from '@core/domain/use-case/input-model/request_reset_password.input_model'
import RequestResetPasswordOutputModel from '@core/domain/use-case/output-model/request_reset_password.output_model'
import { Inject, Logger } from '@nestjs/common'
import { UserDTO } from '@core/domain/use-case/dto/user.dto'
import { UserNotFoundException } from '@core/domain/use-case/exception/auth.exception'
import { v4 } from 'uuid'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import RequestResetPasswordGateway from '@core/domain/use-case/gateway/request_reset_password.gateway'
import RequestResetPasswordMailGateway from '@core/domain/use-case/gateway/request_reset_password.mail_gateway'

export class RequestResetPasswordService implements RequestResetPasswordInteractor {
  private readonly logger: Logger = new Logger(RequestResetPasswordService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: RequestResetPasswordGateway,
    @Inject(UserDITokens.MailRepository)
    private readonly mail_gateway: RequestResetPasswordMailGateway
  ) {
  }

  public async execute(input: RequestResetPasswordInputModel): Promise<RequestResetPasswordOutputModel> {
    const { email } = input;
    const resulting_user: UserDTO = await this.gateway.findOne({
      email,
    });
    if (!resulting_user) {
      throw new UserNotFoundException();
    }
    const token = v4();
    await this.gateway.partialUpdate(
      { email, },
      { reset_password_token: token },
    );
    await this.mail_gateway.send({
      to: email,
      from: 'skillsly_team@skillsly.com',
      subject: 'Request Reset Password Skillsly',
      text: 'Skillsly',
      html:
        '<b> Porfavor ingrese al siguiente enlace para recuperar su contraseña:</b>' +
        `<a href="${process.env.ORIGIN}/reset-password/${token}" target="_blank"> Recuperador de contraseñas Skillsly</a>`,
    });
    return {};
  }
}
