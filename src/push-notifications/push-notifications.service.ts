import { Injectable } from "@nestjs/common";
import { NotificationPlatform } from "ffc-prisma-package/dist/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class PushNotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertNotificationToken(
    token: string,
    platform: NotificationPlatform,
    userId: number
  ) {
    //Check if token already exists
    const existingToken = await this.prisma.notificationSettings.findUnique({
      where: {
        token,
      },
    });

    const prismaPayload = {
      platform,
      User: {
        connect: {
          id: userId,
        },
      },
      token,
    };

    if (existingToken) {
      //Update token
      return await this.prisma.notificationSettings.update({
        where: {
          token,
        },
        data: prismaPayload,
      });
    } else {
      //Create token
      return await this.prisma.notificationSettings.create({
        data: prismaPayload,
      });
    }
  }

  async deleteNotificationToken(token: string) {
    return await this.prisma.notificationSettings.delete({
      where: {
        token,
      },
    });
  }
}
