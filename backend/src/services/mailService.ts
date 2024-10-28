import sendEmail from "../utils/sendEmail";
import { HOST_NAME, PORT } from "../config/env";

export default class MailService {
  public async sendVerificationEmail(
    email: string,
    token: string
  ): Promise<void> {
    const userEmail = email;
    const subject = `Email Verification`;
    const text = `Please verify your email by clicking the following link:
    ${HOST_NAME}:${PORT}/api/v1/auth/verify-email?token=${token}`;

    await sendEmail(userEmail, subject, text);
  }
}
