import { EMAIL, ENVIRONMENT } from '@commons/config/injection-tokens.config';
import { IEmailMailer, IEnvironment } from '@commons/interfaces/environment.interface';
import { inject, injectable } from 'tsyringe';
import { IEmail } from '@commons/interfaces/email';
import { IEmailService } from '@commons/interfaces/email-service.interface';
import nodemailer from 'nodemailer';

@injectable()
export class EmailService implements IEmailService {
  private readonly emailSource: IEmailMailer;
  private readonly transporter;
  constructor(
    @inject(ENVIRONMENT) { emailMailer }: Required<Pick<IEnvironment, 'emailMailer'>>,
  ) {
    this.emailSource = emailMailer;
    this.transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: this.emailSource.userEmail,
            pass: this.emailSource.password
        }
      });
  }

  async sendEmail(email: IEmail): Promise<void> {
    try {
        await this.transporter.sendMail(email);
    } catch (error) {
        throw error;
    }
  }
}
