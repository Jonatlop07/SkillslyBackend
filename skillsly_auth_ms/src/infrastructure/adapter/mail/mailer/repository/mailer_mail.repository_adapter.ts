import MailRepository from '@core/domain/use-case/repository/mail.repository'
import { MailerService } from '@nestjs-modules/mailer'
import SendMailDTO from '@core/domain/use-case/dto/send_mail.dto'

export class MailerMailRepositoryAdapter implements MailRepository {
  constructor(
    private readonly mailer_service: MailerService
  ) {
  }

  public async send(dto: SendMailDTO): Promise<void> {
    const { to, from, text, subject, html } = dto;
    await this.mailer_service.sendMail({
      to, from, text, subject, html
    })
  }
}
