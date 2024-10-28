import { IUser } from "../models/userModel";
import AppError from "../utils/AppError";
import crypto from "crypto";
import UserService from "./userService";
import MailService from "./mailService";
import { ObjectId } from "mongoose";
import { EXPIRE_IN_DAY } from "../config/env";

const EXPIRE_IN_MINUTES = 60 * 1000;

const userService = new UserService();
const mailService = new MailService();

export default class AuthService {
  private generateVerifyTokenAndExpiration() {
    return {
      token: crypto.randomBytes(32).toString("hex"),
      expires: new Date(Date.now() + Number(EXPIRE_IN_DAY)),
    };
  }

  private async resendVerificationToken(user: IUser) {
    const { token, expires } = this.generateVerifyTokenAndExpiration();

    await userService.updateVerificationToken(
      user._id as ObjectId,
      token,
      expires
    );
    await mailService.sendVerificationEmail(user.email, token);
  }

  public async register(email: string, password: string): Promise<IUser> {
    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const { token, expires } = this.generateVerifyTokenAndExpiration();

    const user = await userService.create({
      email,
      password,
      verifyEmailToken: token,
      verifyEmailExpires: expires,
    });

    await mailService.sendVerificationEmail(user.email, token);
    return user;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await userService.findUserByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid credentials", 401);
    }

    if (!user.isVerified) {
      if (
        user.verifyEmailExpires &&
        user.verifyEmailExpires.getTime() < Date.now()
      ) {
        await this.resendVerificationToken(user);
      }
      throw new AppError("Please verify your email before logging in.", 403);
    }

    return userService.generateAuthToken(user._id as string);
  }

  public async verifyEmail(token: string): Promise<boolean> {
    const user = await userService.findByVerificationToken(token);

    if (
      !user ||
      (user.verifyEmailExpires &&
        user.verifyEmailExpires.getTime() < Date.now())
    ) {
      throw new AppError("Verification token is invalid or has expired", 400);
    }

    await userService.markUserAsVerified(user);
    return true;
  }

  // public async sendResetPasswordEmail(email: string) {
  //   const { token } = this.generateTokenAndExpiration();

  //   await userService.updateResetPasswordToken(email, token, EXPIRE_IN_MINUTES);

  //   const resetPasswordLink = `http://localhost:3000/reset-password?token=${token}`;
  //   await mailService.sendEmail({
  //     to: email,
  //     subject: "Reset Password",
  //     text: `To reset your password, click the link: ${resetPasswordLink}`,
  //   });
  // }
}
