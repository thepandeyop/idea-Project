import * as bodyParser from 'body-parser';
import express from 'express';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import { MySqlConfig } from './config/mysql.config';
import { UserRepository } from './repositories/user.repository';
import userRouter from './routes/user.routes';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger';

dotenv.config();
export const appDataSource = new DataSource(MySqlConfig());
appDataSource.initialize().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(morgan("tiny"));
  app.use('/users', userRouter);
  const PORT = process.env.PORT;
  UserRepository.initialize(appDataSource);
  const specs = swaggerJsdoc(swaggerOptions);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
  );

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

});
