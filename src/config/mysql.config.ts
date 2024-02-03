import { DataSourceOptions } from "typeorm";

export const MySqlConfig = () =>  <DataSourceOptions>{
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
    logging: false,
}