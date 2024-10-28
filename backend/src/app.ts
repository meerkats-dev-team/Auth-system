import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: `
  Too many requests, please try again after 15 minutes.
  `,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandlerMiddleware);

export default app;
