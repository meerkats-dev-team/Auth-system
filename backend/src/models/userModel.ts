import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { PASSWORD_SECRET } from "../config/env";

export interface IUser extends Document {
  email: string;
  password: string;
  googleId?: string;
  isVerified: boolean;
  verifyEmailToken?: string;
  verifyEmailExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
  verifyEmailToken: { type: String },
  verifyEmailExpires: { type: Date },

  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password + PASSWORD_SECRET, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(
    candidatePassword + PASSWORD_SECRET,
    this.password
  );
};

const User: Model<IUser> = mongoose.model("User", userSchema);
export default User;
