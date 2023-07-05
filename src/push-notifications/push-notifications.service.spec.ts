import { Test, TestingModule } from "@nestjs/testing";
import { PushNotificationsService } from "./push-notifications.service";
import { PrismaService } from "src/services/prisma.service";
import { FirebaseService } from "src/services/firebase.service";
import { ConfigService } from "@nestjs/config";
import { NotificationPlatform } from "ffc-prisma-package/dist/client";

describe("NotificationsService", () => {
  let service: PushNotificationsService;
  let prismaService: PrismaService;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PushNotificationsService,
        PrismaService,
        FirebaseService,
        ConfigService,
      ],
    }).compile();

    service = module.get<PushNotificationsService>(PushNotificationsService);
    prismaService = module.get<PrismaService>(PrismaService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("upsertNotificationToken", () => {
    it("should update an existing notification token if it already exists", async () => {
      const token = "test-token";
      const platform = NotificationPlatform.IOS;
      const userId = 1;
      const existingToken = {
        id: userId,
        token: "test-token",
        platform: NotificationPlatform.IOS,
        fk_user: 1,
        isActive: true,
      };
      jest
        .spyOn(prismaService.notificationSettings, "findUnique")
        .mockResolvedValue(existingToken);
      const prismaUpdateMock = jest
        .spyOn(prismaService.notificationSettings, "update")
        .mockImplementation();

      await service.upsertNotificationToken(token, platform, userId);

      expect(prismaUpdateMock).toHaveBeenCalledWith({
        where: { token: "test-token" },
        data: {
          platform: NotificationPlatform.IOS,
          User: { connect: { id: userId } },
          token: "test-token",
        },
      });
    });

    it("should create a new notification token if it does not exist", async () => {
      const token = "test-token";
      const platform = NotificationPlatform.IOS;
      const userId = 1;
      jest
        .spyOn(prismaService.notificationSettings, "findUnique")
        .mockResolvedValue(null);
      const prismaCreateMock = jest
        .spyOn(prismaService.notificationSettings, "create")
        .mockImplementation();

      await service.upsertNotificationToken(token, platform, userId);

      expect(prismaCreateMock).toHaveBeenCalledWith({
        data: {
          platform: NotificationPlatform.IOS,
          User: { connect: { id: userId } },
          token: "test-token",
        },
      });
    });
  });

  describe("updateActiveStatus", () => {
    it("should update the active status of a notification token", async () => {
      const token = "test-token";
      const active = false;
      const prismaUpdateMock = jest
        .spyOn(prismaService.notificationSettings, "update")
        .mockImplementation();

      await service.updateActiveStatus(token, active);

      expect(prismaUpdateMock).toHaveBeenCalledWith({
        where: { token: "test-token" },
        data: {
          isActive: false,
        },
      });
    });
  });

  describe("sendPushNotification", () => {
    it("should send push notification to active tokens", async () => {
      const userId = 1;
      const title = "Test Notification";
      const body = "This is a test notification";
      const data = { foo: "bar" };

      const notificationSettings = [
        {
          id: 1,
          fk_user: userId,
          platform: NotificationPlatform.IOS,
          token: "token1",
          isActive: true,
        },
        {
          id: 2,
          fk_user: userId,
          platform: NotificationPlatform.ANDROID,
          token: "token2",
          isActive: true,
        },
        {
          id: 3,
          fk_user: userId,
          platform: NotificationPlatform.WEB,
          token: "token3",
          isActive: false,
        },
      ];

      jest
        .spyOn(prismaService.notificationSettings, "findMany")
        .mockResolvedValue(notificationSettings);
      const sendPushNotificationMock = jest
        .spyOn(firebaseService, "sendPushNotification")
        .mockResolvedValue(true);

      await service.sendPushNotification(userId, title, body, data);

      expect(sendPushNotificationMock).toHaveBeenCalledTimes(3);
      expect(sendPushNotificationMock).toHaveBeenCalledWith(
        "token1",
        title,
        body,
        data
      );
      expect(sendPushNotificationMock).toHaveBeenCalledWith(
        "token2",
        title,
        body,
        data
      );
      expect(sendPushNotificationMock).toHaveBeenCalledWith(
        "token3",
        title,
        body,
        data
      );
    });
  });

  describe("deleteNotificationToken", () => {
    it("should delete notification token", async () => {
      const token = "token1";

      const deleteMock = jest
        .spyOn(prismaService.notificationSettings, "delete")
        .mockResolvedValue({
          id: 1,
          fk_user: 1,
          platform: NotificationPlatform.IOS,
          isActive: true,
          token,
        });

      await service.deleteNotificationToken(token);

      expect(deleteMock).toHaveBeenCalledTimes(1);
      expect(deleteMock).toHaveBeenCalledWith({ where: { token } });
    });
  });
});
