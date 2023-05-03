import { Controller, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {
  }

  @Post("send-account-confirmation")
  async sendAccountConfirmation() {
    return this.emailsService.sendAccountConfirmation();
  }

  @Post("send-password-reset")
  async sendPasswordReset() {
    return this.emailsService.sendPasswordReset();
  }
}
