import { ApiProperty } from "@nestjs/swagger";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

/**
 * GLOBAL EMAIL
 */
export const sendEmail = z.object({
  email: z.string().email(),
  name: z.string(),
  email_token: z.string(),
});

export class SendEmailDto extends createZodDto(sendEmail) {}

export type SendEmailType = z.infer<typeof sendEmail>;

export class SendEmailApiBody {
  @ApiProperty({ type: "string", format: "email" })
  email: string;
  @ApiProperty({ type: "string" })
  name: string;
  @ApiProperty({ type: "string" })
  email_token: string;
}

/**
 * SEND INVOICE EMAIL
 */
export const sendInvoiceEmail = z.object({
  email: z.string().email(),
  name: z.string(),
  price: z.number(),
  invoice_id: z.string(),
  attachment: z.string(),
});

export class SendInvoiceEmailDto extends createZodDto(sendInvoiceEmail) {}

export type SendInvoiceEmailType = z.infer<typeof sendInvoiceEmail>;

export class SendInvoiceEmailApiBody {
  @ApiProperty({ type: "string", format: "email" })
  email: string;
  @ApiProperty({ type: "string" })
  name: string;
  @ApiProperty({ type: "number" })
  price: number;
  @ApiProperty({ type: "number" })
  invoice_id: string;
  @ApiProperty({ type: "string" })
  attachment: string;
}

/**
 * WITHDRAW INVOICE
 */
export const withdrawInvoice = z.object({
  email: z.string().email(),
  name: z.string(),
  invoice_id: z.string(),
  invoice_url: z.string(),
  totalWithdraw: z.number(),
  feesPercentage: z.string(),
  fees: z.number(),
  amount: z.number(),
  lastDigits: z.string().length(4),
});

export class WithdrawInvoiceDto extends createZodDto(withdrawInvoice) {
  @ApiProperty({ type: "string", format: "email" })
  email: string;

  @ApiProperty({ type: "string" })
  name: string;

  @ApiProperty({ type: "string" })
  invoice_id: string;

  @ApiProperty({ type: "number" })
  totalWithdraw: number;

  @ApiProperty({ type: "string" })
  feesPercentage: string;

  @ApiProperty({ type: "number" })
  fees: number;

  @ApiProperty({ type: "number" })
  amount: number;

  @ApiProperty({ type: "string" })
  lastDigits: string;
}
