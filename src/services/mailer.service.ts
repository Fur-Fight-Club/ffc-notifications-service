import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as SibApiV3Sdk from "sib-api-v3-sdk";

@Injectable()
export class MailerService {
  private client: any;
  private apiKey: any;
  private apiInstance: any;
  private sender: { name: string; email: string };

  constructor(private config: ConfigService) {
    this.client = SibApiV3Sdk.ApiClient.instance;
    this.apiKey = this.client.authentications["api-key"];
    this.apiKey.apiKey = config.get<string>("sib_api_key");
    this.apiInstance = new SibApiV3Sdk.SMTPApi();
    this.sender = {
      name: "Fury Fight Club",
      email: "no-reply@ffc.mistergooddeal.org",
    };
  }

  async sendAccountConfirmation(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean> {
    let smtpEmailParams = new SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 3,
      sender: this.sender,
      params: {
        name,
        confirmation_url: `${this.config.get<string>(
          "frontend_url"
        )}/confirmAccount?token=${email_token}`,
      },
    };
    smtpEmailParams = { ...smtpEmailParams, ...params };

    try {
      await this.apiInstance.sendTransacEmail(smtpEmailParams);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendPasswordReset(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean> {
    let smtpEmailParams = new SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 4,
      sender: this.sender,
      params: {
        name,
        reset_url: `${this.config.get<string>(
          "frontend_url"
        )}/account/reset-password?token=${email_token}`,
      },
    };
    smtpEmailParams = { ...smtpEmailParams, ...params };

    try {
      await this.apiInstance.sendTransacEmail(smtpEmailParams);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendUpdateEmail(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean> {
    let smtpEmailParams = new SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 3,
      sender: this.sender,
      params: {
        name,
        update_email_url: `${this.config.get<string>(
          "frontend_url"
        )}/account/confirm?token=${email_token}`,
      },
    };
    smtpEmailParams = { ...smtpEmailParams, ...params };

    try {
      await this.apiInstance.sendTransacEmail(smtpEmailParams);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendInvoice(
    email: string,
    name: string,
    price: number,
    invoice_id: string,
    attachment: string
  ): Promise<boolean> {
    let smtpEmailParams = new SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 5,
      sender: this.sender,
      params: {
        name,
        price: price.toFixed(2),
        invoice_id,
        date: new Date().toLocaleDateString("fr-FR"),
        invoice_url: attachment,
      },
    };
    smtpEmailParams = { ...smtpEmailParams, ...params };

    try {
      await this.apiInstance.sendTransacEmail(smtpEmailParams);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async sendWithdrawInvoice(
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
    let smtpEmailParams = new SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 6,
      sender: this.sender,
      params: {
        name,
        invoice_id,
        invoice_url,
        date: new Date().toLocaleDateString("fr-FR"),
        totalWithdraw: totalWithdraw.toFixed(2),
        feesPercentage,
        fees: fees.toFixed(2),
        amount: amount.toFixed(2),
        lastDigits,
      },
    };
    smtpEmailParams = { ...smtpEmailParams, ...params };

    try {
      await this.apiInstance.sendTransacEmail(smtpEmailParams);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
