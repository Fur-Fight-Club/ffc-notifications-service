import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SendEmailApiBody, SendEmailDto } from './emails.schema';
import { ZodValidationPipe } from 'nestjs-zod';
import { ServiceGuard } from 'src/auth/auth-service.guard';

@Controller('emails')
@ApiTags('Emails controller')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {
  }

  @Post("send-account-confirmation")
  @UseGuards(ServiceGuard)
  @ApiBody({
    description: "Send account confirmation email",
    type: SendEmailApiBody,
  })
  async sendAccountConfirmation(
    @Body(ZodValidationPipe) sendEmailDto: SendEmailDto,
  ) {
    const { email, name, email_token } = sendEmailDto;
    return this.emailsService.sendAccountConfirmation(email, name, email_token);
  }

  @Post("send-password-reset")
  @UseGuards(ServiceGuard)
  @ApiBody({
    description: "Send password reset email",
    type: SendEmailApiBody,
  })
  async sendPasswordReset(
    @Body(ZodValidationPipe) sendEmailDto: SendEmailDto,
  ) {
    const { email, name, email_token } = sendEmailDto;
    return this.emailsService.sendPasswordReset(email, name, email_token);
  }
}
