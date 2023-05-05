import { Module } from "@nestjs/common";
import { MatchMessageService } from "./match-message.service";
import { MatchMessageController } from "./match-message.controller";
import { PrismaService } from "src/services/prisma.service";
import { MatchMessageGateway } from "./match-message.gateway";

@Module({
  controllers: [MatchMessageController],
  providers: [MatchMessageService, PrismaService, MatchMessageGateway],
})
export class MatchMessageModule {}
