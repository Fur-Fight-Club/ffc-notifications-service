import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const sendEmail = z.object({
  email: z.string().email(),
  name: z.string(),
  email_token: z.string(),
});

export class SendEmailDto extends createZodDto(sendEmail) { }

export type SendEmailType = z.infer<typeof sendEmail>;

export class SendEmailApiBody {
  @ApiProperty({ type: "string", format: "email" })
  email: string;
  @ApiProperty({ type: "string" })
  name: string;
  @ApiProperty({ type: "string" })
  email_token: string;
}