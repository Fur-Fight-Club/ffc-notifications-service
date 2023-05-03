import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/services/mailer.service';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) { }

  async sendAccountConfirmation(email: string, name: string, email_token: string): Promise<boolean> {
    return await this.mailerService.sendAccountConfirmation(email, name, email_token);

  }

  async sendPasswordReset(email: string, name: string, email_token: string): Promise<boolean> {
    return await this.mailerService.sendPasswordReset(email, name, email_token);
  }
}
