import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET as string);
};
