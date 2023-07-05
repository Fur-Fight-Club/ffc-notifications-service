import { Test, TestingModule } from "@nestjs/testing";
import { MatchMessageService } from "./match-message.service";
import { PrismaService } from "src/services/prisma.service";
import { MatchMessageGateway } from "./match-message.gateway";
import { ConfigService } from "@nestjs/config";

describe("MatchMessageService", () => {
  let service: MatchMessageService;
  let prismaService: PrismaService;

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
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new match message and send it to the client", async () => {
      const createMatchMessageDto = {
        message: "Test message",
        sender: 1,
        match: 1,
      };

      const createdMatchMessage = {
        id: 1,
        message: "Test message",
        fk_match: 1,
        fk_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const prismaCreateMock = jest
        .spyOn(prismaService.matchMessage, "create")
        .mockResolvedValue(createdMatchMessage);

      const result = await service.create(createMatchMessageDto);

      expect(prismaCreateMock).toHaveBeenCalledWith({
        data: {
          message: "Test message",
          User: {
            connect: { id: 1 },
          },
          Match: {
            connect: { id: 1 },
          },
        },
      });

      expect(result).toEqual(createdMatchMessage);
    });
  });
});
