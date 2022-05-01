import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post, ValidationPipe } from '@nestjs/common'
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger'
import { NotificationDITokens } from '@core/domain/di/notification_di_tokens'
import { HttpExceptionMapper } from '@application/api/http-rest/exception/http_exception.mapper'
import { CreateNotificationService } from '@core/service/create_notification.service'
import { CreateNotificationDTO } from '@application/api/http-rest/http-dto/http_create_notification.dto'
import { CreateNotificationMapper } from '@application/api/http-rest/http-mapper/http_create_notification.mapper'

@Controller('notification')
@ApiTags('notification')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred',
})
export class NotificationController {
  private readonly logger: Logger = new Logger(NotificationController.name);

  constructor(
    @Inject(NotificationDITokens.CreateNotificationInteractor)
    private readonly create_notification_service: CreateNotificationService
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Notification has been successfully created' })
  @HttpCode(HttpStatus.CREATED)
  public async createNotification(
    @Body(new ValidationPipe()) create_notification_details: CreateNotificationDTO
  ) {
   try {
     return await this.create_notification_service.execute(
       CreateNotificationMapper.toInputModel(create_notification_details)
     );
   } catch (e) {
     throw HttpExceptionMapper.toHttpException(e);
   }
  }
}
