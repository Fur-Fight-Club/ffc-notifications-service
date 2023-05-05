import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { MatchMessageService } from "./match-message.service";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "nestjs-zod";
import {
  CreateMessageApiBody,
  CreateMessageDto,
  UpdateMessageApiBody,
  UpdateMessageDto,
} from "./match-message.schema";
import { ServiceGuard } from "src/auth/auth-service.guard";

@Controller("match-message")
@ApiTags("Match messages Controller")
export class MatchMessageController {
  constructor(private readonly matchMessageService: MatchMessageService) {}

  @Post()
  //@UseGuards(ServiceGuard)
  @ApiBody({
    description: "Create a new match message",
    type: CreateMessageApiBody,
  })
  create(@Body(ZodValidationPipe) createMatchMessageDto: CreateMessageDto) {
    return this.matchMessageService.create(createMatchMessageDto);
  }

  @Get("/match/:id")
  @UseGuards(ServiceGuard)
  @ApiParam({
    name: "id",
    type: "number",
    description: "The id of the match",
  })
  findAll(@Param("id") id: string) {
    return this.matchMessageService.findAll(+id);
  }

  @Get(":id")
  @UseGuards(ServiceGuard)
  @ApiParam({
    name: "id",
    type: "number",
    description: "The id of the message",
  })
  findOne(@Param("id") id: string) {
    return this.matchMessageService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(ServiceGuard)
  @ApiParam({
    name: "id",
    type: "number",
    description: "The id of the message",
  })
  @ApiBody({
    description: "Update a match message",
    type: UpdateMessageApiBody,
  })
  update(
    @Param("id") id: string,
    @Body(ZodValidationPipe) updateMatchMessageDto: UpdateMessageDto
  ) {
    return this.matchMessageService.update(+id, updateMatchMessageDto);
  }

  @Delete(":id")
  @UseGuards(ServiceGuard)
  @ApiParam({
    name: "id",
    type: "number",
    description: "The id of the message",
  })
  remove(@Param("id") id: string) {
    return this.matchMessageService.remove(+id);
  }
}
