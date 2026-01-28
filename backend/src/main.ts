import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AppExceptionFilter } from "./common/filters/httpException.filter";
import {
  NestExpressApplication,
  ExpressAdapter,
} from "@nestjs/platform-express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express from "express";
import { LOG_MESSAGES } from "./lib/constants";
import appConfig from "./config/config";

const server = express();

export async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  const config = appConfig();

  app.use(helmet());
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new AppExceptionFilter());

  await app.init();
  return { app, config };
}

// Logic to run locally vs Vercel
if (process.env.NODE_ENV !== "production") {
  createApp().then(async ({ app, config }) => {
    const port = config.port || 3000;
    await app.listen(port);
    console.log(`${LOG_MESSAGES.APP_RUNNING} on port ${port}`);
  });
} else {
  // On Vercel, we just need to ensure the app is initialized
  // Vercel handles the incoming requests via the exported 'server'
  createApp();
}

export default server;
