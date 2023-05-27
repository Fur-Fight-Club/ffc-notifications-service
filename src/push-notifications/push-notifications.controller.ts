import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { PushNotificationsService } from "./push-notifications.service";
import { ZodValidationPipe } from "nestjs-zod";
import {
  DeleteNotificationTokenDto,
  SendPushNotificationDto,
  UpdateActiveStatusDto,
  UpsertNotificationTokenDto,
} from "./push-notifications.schema";
import { ServiceGuard } from "src/auth/auth-service.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("push-notifications")
@ApiTags("Push Notifications Controller")
@UseGuards(ServiceGuard)
@ApiBearerAuth()
export class PushNotificationsController {
  constructor(
    private readonly notificationsService: PushNotificationsService
  ) {}

  @Post()
  async upsertNotificationToken(
    @Body(ZodValidationPipe) body: UpsertNotificationTokenDto
  ) {
    const { token, platform, userId } = body;
    return await this.notificationsService.upsertNotificationToken(
      token,
      platform,
      userId
    );
  }

  @Delete()
  async deleteNotificationToken(
    @Body(ZodValidationPipe) body: DeleteNotificationTokenDto
  ) {
    const { token } = body;
    return await this.notificationsService.deleteNotificationToken(token);
  }

  @Patch("active")
  async updateActiveStatus(
    @Body(ZodValidationPipe) body: UpdateActiveStatusDto
  ) {
    const { token, active } = body;
    return await this.notificationsService.updateActiveStatus(token, active);
  }

  @Post("send")
  sendPushNotification(@Body(ZodValidationPipe) body: SendPushNotificationDto) {
    const { title, body: message, data, userId } = body;
    return this.notificationsService.sendPushNotification(
      userId,
      title,
      message,
      data
    );
  }
}
