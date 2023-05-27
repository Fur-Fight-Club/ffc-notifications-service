import { Test, TestingModule } from "@nestjs/testing";
import { PushNotificationsController } from "./push-notifications.controller";
import { PushNotificationsService } from "./push-notifications.service";

describe("NotificationsController", () => {
  let controller: PushNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushNotificationsController],
      providers: [PushNotificationsService],
    }).compile();

    controller = module.get<PushNotificationsController>(
      PushNotificationsController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
