import { Injectable } from "@nestjs/common";
import { last } from "rxjs";
import { MailerService } from "src/services/mailer.service";

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAccountConfirmation(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean> {
    return await this.mailerService.sendAccountConfirmation(
      email,
      name,
      email_token
    );
  }

  async sendPasswordReset(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean> {
    return await this.mailerService.sendPasswordReset(email, name, email_token);
  }

  async sendInvoice(
    email: string,
    name: string,
    price: number,
    invoice_id: string,
    attachment: string
  ): Promise<boolean> {
    return await this.mailerService.sendInvoice(
      email,
      name,
      price,
      invoice_id,
      attachment
    );
  }
  sendWithdrawInvoice(
    email: string,
    name: string,
    invoice_id: string,
    invoice_url: string,
    totalWithdraw: number,
    feesPercentage: string,
    fees: number,
    amount: number,
    lastDigits: string
  ) {
    this.mailerService.sendWithdrawInvoice(
      email,
      name,
      invoice_id,
      invoice_url,
      totalWithdraw,
      feesPercentage,
      fees,
      amount,
      lastDigits
    );
  }
}
