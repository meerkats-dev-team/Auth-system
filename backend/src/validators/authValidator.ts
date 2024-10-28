import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { formatZodError } from "../utils/formatZodError";

// Schemas
const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim(),
});

export default class AuthValidator {
  validateRegister(req: Request, res: Response, next: NextFunction) {
    try {
      registerSchema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json(formatZodError(error as ZodError));
    }
  }

  validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      loginSchema.parse(req.body);
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json(formatZodError(error as ZodError));
    }
  }
}
