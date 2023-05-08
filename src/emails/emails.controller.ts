import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { EmailsService } from "./emails.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  SendEmailApiBody,
  SendEmailDto,
  SendInvoiceEmailApiBody,
  SendInvoiceEmailDto,
  WithdrawInvoiceDto,
} from "./emails.schema";
import { ZodValidationPipe } from "nestjs-zod";
import { ServiceGuard } from "src/auth/auth-service.guard";

@Controller("emails")
@ApiTags("Emails controller")
@UseGuards(ServiceGuard)
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post("send-account-confirmation")
  @ApiBody({
    description: "Send account confirmation email",
    type: SendEmailApiBody,
  })
  async sendAccountConfirmation(
    @Body(ZodValidationPipe) sendEmailDto: SendEmailDto
  ) {
    const { email, name, email_token } = sendEmailDto;
    return this.emailsService.sendAccountConfirmation(email, name, email_token);
  }

  @Post("send-password-reset")
  @ApiBody({
    description: "Send password reset email",
    type: SendEmailApiBody,
  })
  async sendPasswordReset(@Body(ZodValidationPipe) sendEmailDto: SendEmailDto) {
    const { email, name, email_token } = sendEmailDto;
    return this.emailsService.sendPasswordReset(email, name, email_token);
  }

  @Post("send-invoice")
  @ApiBody({
    description: "Send invoice email",
    type: SendInvoiceEmailApiBody,
  })
  @ApiResponse({
    status: 200,
    description: "Email sent",
    type: Boolean,
  })
  async sendInvoice(
    @Body(ZodValidationPipe) sendInvoiceEmailDto: SendInvoiceEmailDto
  ) {
    const { email, name, price, invoice_id, attachment } = sendInvoiceEmailDto;
    return this.emailsService.sendInvoice(
      email,
      name,
      price,
      invoice_id,
      attachment
    );
  }

  @Post("send-withdraw-invoice")
  @ApiBody({
    description: "Send withdraw invoice email",
    type: WithdrawInvoiceDto,
  })
  @ApiResponse({
    status: 200,
    description: "Email sent",
    type: Boolean,
  })
  async sendWithdrawInvoice(
    @Body(ZodValidationPipe) withdrawInvoiceDto: WithdrawInvoiceDto
  ) {
    const {
      email,
      name,
      invoice_id,
      invoice_url,
      totalWithdraw,
      feesPercentage,
      fees,
      amount,
    } = withdrawInvoiceDto;
    return this.emailsService.sendWithdrawInvoice(
      email,
      name,
      invoice_id,
      invoice_url,
      totalWithdraw,
      feesPercentage,
      fees,
      amount
    );
  }
}
