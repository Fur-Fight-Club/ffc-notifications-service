import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { MailerService } from 'src/services/mailer.service';

@Module({
  controllers: [EmailsController],
  providers: [EmailsService, MailerService]
})
export class EmailsModule { }
