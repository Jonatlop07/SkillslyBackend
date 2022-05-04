import SendMailDTO from '@core/domain/use-case/dto/send_mail.dto'

export default interface RequestResetPasswordMailGateway {
  send(dto: SendMailDTO): Promise<void>;
}
