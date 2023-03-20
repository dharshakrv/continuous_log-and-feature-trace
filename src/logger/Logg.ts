import winston from 'winston';
import { Kafka } from 'kafkajs';
import { MessagingService } from '../service/MessagingService';
import { DI } from '../di/DIContainer';
const LokiTransport = require('winston-loki')

export class Logg {
    private logger: winston.Logger
    // private messagingService: MessagingService
    private levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 }
    private colors = { error: 'red', warn: 'yellow', info: 'green', http: 'magenta', debug: 'white' }
    
    private kafka: Kafka = new Kafka({
        clientId: 'kafka-app',
        brokers: ['localhost:9092']
    })

    constructor() {
        // this.messagingService = DI.get(MessagingService)
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

    // async publishTopic(topic: string, message: any) {
    //     this.logger.info(`Published message =>, ${JSON.stringify(message)}`)
    //     this.logger.info(`Publish topic => ${topic}`)
    //     const producer: Producer = this.kafka.producer()
    //     await producer.connect()
    //     await producer.send({
    //         topic: topic,
    //         messages: [{
    //             value: JSON.stringify(message)
    //         }]
    //     })
    // }

    async info(message: any) {
        // await this.messagingService.publishMessage('LOG_MESSAGE_TOPIC', message)
        // await this.publishTopic('LOG_MESSAGE_TOPIC', message)
        this.logger.info({ message: JSON.stringify(message), labels: {log: 'info'} })
        // this.logger.info('\u{2139} ', message, '\n');
    }

    async warn(message: any) {
        // await this.messagingService.publishMessage('LOG_MESSAGE_TOPIC', message)
        // await this.publishTopic('LOG_MESSAGE_TOPIC', message)
        this.logger.warn({ message: JSON.stringify(message), labels: {log: 'warn'} })
        // this.logger.warn('\u{1F525} ', message, '\n');
    }

    async error(message: any) {
        // await this.messagingService.publishMessage('LOG_MESSAGE_TOPIC', message)
        // await this.publishTopic('LOG_MESSAGE_TOPIC', message)
        this.logger.error({ message: JSON.stringify(message), labels: {log: 'error'} })
        // this.logger.error('\u{274E} ', message, '\n');
    }
}
