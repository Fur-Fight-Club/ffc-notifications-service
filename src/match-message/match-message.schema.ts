import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

/**
 * CREATE MESSAGE
 */
export const createMessage = z.object({
  sender: z.number().int(),
  match: z.number().int(),
  message: z.string(),
});

export class CreateMessageDto extends createZodDto(createMessage) {}
export type CreateMessageType = z.infer<typeof createMessage>;

export class CreateMessageApiBody {
  @ApiProperty({
    type: "number",
    default: 1,
  })
  sender: number;
  @ApiProperty({
    type: "number",
    default: 1,
  })
  match: number;
  @ApiProperty({
    type: "string",
    default: "Hello World!",
  })
  message: string;
}

/**
 * UPDATE MESSAGE
 */
export const updateMessage = z.object({
  message: z.string(),
});

export class UpdateMessageDto extends createZodDto(updateMessage) {}
export type UpdateMessageType = z.infer<typeof updateMessage>;

export class UpdateMessageApiBody {
  @ApiProperty({
    type: "string",
    default: "Hello World!",
  })
  message: string;
}
