import { DataSource, DataSourceOptions } from "typeorm";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "../config/constantes";
const options: DataSourceOptions = {
  type: "mysql",
  host: process.env[DATABASE_HOST],
  username: process.env[DATABASE_USERNAME],
  port: +process.env[DATABASE_PORT],
  password: process.env[DATABASE_PASSWORD],
  database: process.env[DATABASE_NAME],
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../**/migrations/*{.ts,.js}`],
};

export default new DataSource(options);
