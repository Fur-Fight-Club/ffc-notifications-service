import { Test, TestingModule } from "@nestjs/testing";
import { PushNotificationsService } from "./push-notifications.service";
import { PrismaService } from "src/services/prisma.service";
import { FirebaseService } from "src/services/firebase.service";
import { ConfigService } from "@nestjs/config";

describe("NotificationsService", () => {
  let service: PushNotificationsService;

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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
