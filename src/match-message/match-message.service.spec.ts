import { Test, TestingModule } from "@nestjs/testing";
import { MatchMessageService } from "./match-message.service";
import { PrismaService } from "src/services/prisma.service";
import { MatchMessageGateway } from "./match-message.gateway";
import { ConfigService } from "@nestjs/config";

describe("MatchMessageService", () => {
  let service: MatchMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchMessageService,
        PrismaService,
        MatchMessageGateway,
        ConfigService,
      ],
    }).compile();

    service = module.get<MatchMessageService>(MatchMessageService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
