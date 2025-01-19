import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import pino from 'pino';

import { healthCheckRouter } from './api/health-check';
import { openAPIRouter } from './api-docs/openapi-router';
import requestLoggerMiddlewares from './common/middleware/request-logger-middlewares';
import { env } from './common/utils/env-config';

const logger = pino({
  name: 'server',
});

const app: Express = express();

// Setup pino http middleware
// app.use(pinoHttpConfig(logger));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Setup request logging middleware
app.use(requestLoggerMiddlewares({ logger, quietReqLogger: true }));

// Setup custom routes
app.use('/health-check', healthCheckRouter);

// Setup openapi router
app.use(openAPIRouter);

export { app, logger };
