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
    const emailSent = this.emailsService.sendAccountConfirmation(
      email,
      name,
      email_token
    );
    return { emailSent };
  }

  @Post("send-password-reset")
  @ApiBody({
    description: "Send password reset email",
    type: SendEmailApiBody,
  })
  async sendPasswordReset(@Body(ZodValidationPipe) sendEmailDto: SendEmailDto) {
    const { email, name, email_token } = sendEmailDto;
    const emailSent = this.emailsService.sendPasswordReset(
      email,
      name,
      email_token
    );
    return { emailSent };
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
    const emailSent = this.emailsService.sendInvoice(
      email,
      name,
      price,
      invoice_id,
      attachment
    );
    return { emailSent };
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
    const emailSent = this.emailsService.sendWithdrawInvoice(
      email,
      name,
      invoice_id,
      invoice_url,
      totalWithdraw,
      feesPercentage,
      fees,
      amount
    );
    return { emailSent };
  }
}
