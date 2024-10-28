import app from "./app";
import { HOST_NAME, PORT } from "./config/env";
import connectDB from "./config/db";

const port: number = Number(PORT) || 4000;
const hostName: string = HOST_NAME as string;

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(port, () => {
    console.info(`Server is running on ${hostName}:${port}`);
    console.info(`Swagger UI is running on ${hostName}:${port}/api-docs`);
  });
};

start();
