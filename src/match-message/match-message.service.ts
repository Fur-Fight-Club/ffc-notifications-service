import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateMessageDto, UpdateMessageDto } from "./match-message.schema";
import { PrismaService } from "src/services/prisma.service";
import { MatchMessage } from "ffc-prisma-package/dist/client";
import { MatchMessageGateway } from "./match-message.gateway";
import { handleMatchMessageError } from "src/utils/errors/match-message.errors";

@Injectable()
export class MatchMessageService {
  constructor(
    private readonly prisma: PrismaService,
    private matchMessageGateway: MatchMessageGateway
  ) {}

  async create(createMatchMessageDto: CreateMessageDto): Promise<MatchMessage> {
    try {
      const message = await this.prisma.matchMessage.create({
        data: {
          message: createMatchMessageDto.message,
          User: {
            connect: {
              id: createMatchMessageDto.sender,
            },
          },
          Match: {
            connect: {
              id: createMatchMessageDto.match,
            },
          },
        },
      });

      this.matchMessageGateway.sendMessageToClient(message);

      return message;
    } catch (error) {
      handleMatchMessageError(error);
    }
  }

  async findAll(id: number): Promise<MatchMessage[]> {
    return await this.prisma.matchMessage.findMany({
      where: {
        fk_match: id,
      },
    });
  }

  async findOne(id: number): Promise<MatchMessage> {
    return await this.prisma.matchMessage.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateMatchMessageDto: UpdateMessageDto
  ): Promise<MatchMessage> {
    return await this.prisma.matchMessage.update({
      where: {
        id: id,
      },
      data: {
        message: updateMatchMessageDto.message,
      },
    });
  }

  async remove(id: number): Promise<MatchMessage> {
    return await this.prisma.matchMessage.delete({
      where: {
        id: id,
      },
    });
  }
}
