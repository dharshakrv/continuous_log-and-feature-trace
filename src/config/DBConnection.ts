import Sequelize = require('sequelize');
import { Logger } from '../logger/Logger';
import { DI } from '../di/DIContainer';

export class DBConnection {

    connection: Sequelize.Sequelize;
    private logger: Logger;

    constructor() {
        this.logger = DI.get(Logger);
        this.logger.log(`DB NAME + ${process.env.DB_NAME}`);
        this.connection = new Sequelize.Sequelize(
            process.env.DB_NAME!,
            process.env.DB_USER!,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                port: !!(process.env.DB_PORT) ? parseInt(process.env.DB_PORT!) : 3306,
                dialect: 'mysql',
                define: {
                    timestamps: false
                },
                logging: false
            },
        );

        this.connection.authenticate().then(() => {
            this.logger.log('DB Connected');
        }, () => {
            this.logger.log('DB Not Connected');
        })
    }
}
