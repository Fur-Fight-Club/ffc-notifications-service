import { Module } from "@nestjs/common";
import { PushNotificationsService } from "./push-notifications.service";
import { PushNotificationsController } from "./push-notifications.controller";
import { PrismaService } from "src/services/prisma.service";

@Module({
  controllers: [PushNotificationsController],
  providers: [PushNotificationsService, PrismaService],
})
export class PushNotificationsModule {}
