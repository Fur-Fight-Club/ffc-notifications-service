import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class MailerService {
  private SibApiV3Sdk: any;
  private client: any;
  private apiKey: any;
  private apiInstance: any;

  constructor(private config: ConfigService) {
    this.SibApiV3Sdk = require("sib-api-v3-sdk");
    this.client = this.SibApiV3Sdk.ApiClient.instance;
    this.apiKey = this.client.authentications["api-key"];
    this.apiKey.apiKey = config.get<string>("sib_api_key");
    this.apiInstance = new this.SibApiV3Sdk.SMTPApi();
  }

  async sendAccountConfirmation(email: string, name: string, email_token: string): Promise<boolean> {
    let smtpEmailParams = new this.SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 3,
      sender: "no-reply@ffc.mistergooddeal.org",
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
    let smtpEmailParams = new this.SibApiV3Sdk.SendSmtpEmail();
    const params = {
      to: [{ email: email }],
      templateId: 4,
      sender: "no-reply@ffc.mistergooddeal.org",
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