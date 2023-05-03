import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as SibApiV3Sdk from "sib-api-v3-sdk";


@Injectable()
export class MailerService {
  private client: any;
  private apiKey: any;
  private apiInstance: any;
  private sender: { name: string, email: string };

  constructor(private config: ConfigService) {
    this.client = SibApiV3Sdk.ApiClient.instance;
    this.apiKey = this.client.authentications["api-key"];
    this.apiKey.apiKey = config.get<string>("sib_api_key");
    this.apiInstance = new SibApiV3Sdk.SMTPApi();
    this.sender = {
      name: "Fury Fight Club",
      email: "no-reply@ffc.mistergooddeal.org"
    }
  }

  async sendAccountConfirmation(email: string, name: string, email_token: string): Promise<boolean> {
    let smtpEmailParams = new SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 3,
      sender: this.sender,
      params: {
        name,
        confirmation_url: `${this.config.get<string>("frontend_url")}/confirm-account?token=${email_token}`,
      },
    };
    smtpEmailParams = { ...smtpEmailParams, ...params };

    try {
      const data = await this.apiInstance.sendTransacEmail(smtpEmailParams);
      console.log(data);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendPasswordReset(email: string, name: string, email_token: string): Promise<boolean> {
    let smtpEmailParams = new SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 4,
      sender: this.sender,
      params: {
        name,
        reset_url: `${this.config.get<string>("frontend_url")}/reset-password?token=${email_token}`,
      },
    };
    smtpEmailParams = { ...smtpEmailParams, ...params };

    try {
      const data = await this.apiInstance.sendTransacEmail(smtpEmailParams);
      console.log(data);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}