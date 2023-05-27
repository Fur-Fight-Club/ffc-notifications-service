import { Injectable } from "@nestjs/common";
import { NotificationPlatform } from "ffc-prisma-package/dist/client";
import { FirebaseService } from "src/services/firebase.service";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class PushNotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseService
  ) {}

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

  async updateActiveStatus(token: string, active: boolean) {
    return await this.prisma.notificationSettings.update({
      where: {
        token,
      },
      data: {
        isActive: active,
      },
    });
  }

  async sendPushNotification(
    userId: number,
    title: string,
    body: string,
    data: any
  ) {
    const notificationSettings =
      await this.prisma.notificationSettings.findMany({
        where: {
          User: {
            id: userId,
          },
          isActive: true,
        },
      });

    const tokens = notificationSettings.map((setting) => setting.token);

    const promises = tokens.map((token) =>
      this.firebase.sendPushNotification(token, title, body, data)
    );

    return await Promise.all(promises);
  }
}
