import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formatZodError } from "../utils/formatZodError";
import AppError from "../utils/AppError";

const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  if (error instanceof ZodError) {
    res.status(400).json({
      status: "fail",
      errors: formatZodError(error),
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(statusCode).json({
      status: error.isOperational ? "error" : "fail",
      message,
    });
    return;
  }
  res.status(500).json({
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
};

export default errorHandlerMiddleware;
