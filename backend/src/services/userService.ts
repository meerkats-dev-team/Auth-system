import User, { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../config/env";
import { ObjectId } from "mongoose";

export default class UserService {
  public async create(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return user.save();
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  public async findByVerificationToken(token: string): Promise<IUser | null> {
    return User.findOne({
      verifyEmailToken: token,
      verifyEmailExpires: { $gt: Date.now() },
    });
  }

  public async updateVerificationToken(
    userId: ObjectId,
    verfiyToken: string,
    verfiyExpire: Date
  ): Promise<IUser | null> {
    const user: IUser | null = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          verifyEmailToken: verfiyToken,
          verifyEmailExpires: verfiyExpire,
        },
      },
      { returnDocument: "after" }
    );

    return user;
  }

  public async generateAuthToken(userId: string): Promise<string> {
    return jwt.sign({ id: userId }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRY,
    });
  }

  public async markUserAsVerified(user: IUser): Promise<IUser> {
    user.isVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailExpires = undefined;
    return user.save();
  }

  public isVerificationExpired(expirationDate: Date | undefined): boolean {
    return expirationDate ? expirationDate.getTime() < Date.now() : true;
  }
}
