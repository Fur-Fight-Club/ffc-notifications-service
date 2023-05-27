import { Body, Controller, Delete, Post } from "@nestjs/common";
import { PushNotificationsService } from "./push-notifications.service";
import { ZodValidationPipe } from "nestjs-zod";
import {
  DeleteNotificationTokenDto,
  UpsertNotificationTokenDto,
} from "./push-notifications.schema";

@Controller("push-notifications")
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
}
