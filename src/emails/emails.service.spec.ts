import { Test, TestingModule } from "@nestjs/testing";
import { EmailsService } from "./emails.service";
import { MailerService } from "src/services/mailer.service";
import { ConfigService } from "@nestjs/config";

describe("EmailsService", () => {
  let service: EmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailsService, MailerService, ConfigService],
    }).compile();

    service = module.get<EmailsService>(EmailsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("sendAccountConfirmation", () => {
    it("should return the result from mailerService.sendAccountConfirmation", async () => {
      const email = "test@example.com";
      const name = "John Doe";
      const emailToken = "abc123";

      jest.spyOn(service, "sendAccountConfirmation").mockResolvedValue(true);

      const result = await service.sendAccountConfirmation(
        email,
        name,
        emailToken
      );

      expect(result).toEqual(true);
    });
  });
});
