import winston from 'winston';
const LokiTransport = require('winston-loki')

export class Logger {
    private logger: winston.Logger
    private levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 }
    private colors = { error: 'red', warn: 'yellow', info: 'green', http: 'magenta', debug: 'white' }
    
    constructor() {
        winston.addColors(this.colors),
        this.logger = winston.createLogger({
            levels: this.levels,
            defaultMeta: {},
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/all.log' }),
                new LokiTransport({
                    host: "http://localhost:3100",
                    interval: 5,
                    json: true
                })
            ]
        })
        this.logger.exceptions.handle(
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'exceptions.log', dirname: 'logs' }),
            new LokiTransport({
                host: "http://localhost:3100",
                    interval: 5,
                    json: true,
                    labels: { exception: 'exception_logs' }
            })
        );
    }

    async log(message: any) {
        this.logger.info({ message: JSON.stringify(message), labels: {log: 'log'} })
        // this.logger.info('\u{2139} ', message, '\n');
    }

    async info(message: any) {
        this.logger.info({ message: JSON.stringify(message), labels: {log: 'info'} })
        // this.logger.info('\u{2139} ', message, '\n');
    }

    async warn(message: any) {
        this.logger.warn({ message: JSON.stringify(message), labels: {log: 'warn'} })
        // this.logger.warn('\u{1F525} ', message, '\n');
    }

    async error(message: any) {
        this.logger.error({ message: JSON.stringify(message), labels: {log: 'error'} })
        // this.logger.error('\u{274E} ', message, '\n');
    }
}
