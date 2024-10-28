import swaggerJsdoc from "swagger-jsdoc";
import { HOST_NAME, PORT } from "./env";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Auth system global",
    version: "1.0.0",
    description: "API documentation for your application",
  },
  servers: [
    {
      url: `${HOST_NAME}:${PORT}/`, // Dynamically sets the server URL
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  definition: swaggerDefinition, // Use "definition" instead of "swaggerDefinition"
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/models/*.ts"], // Paths to files to generate documentation from
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
