import { Kafka, Producer, Consumer } from 'kafkajs';
import { DI } from '../di/DIContainer';
import { Logger } from '../logger/Logger';
import { Service } from './ServiceFile';

export class MessagingService {
    private kafka: Kafka = new Kafka({
        clientId: 'kafka-app',
        brokers: ['localhost:9092']
    })

    private logger: Logger
    private serviceFile: Service

    constructor() {
        this.logger = DI.get(Logger)
        this.serviceFile = DI.get(Service)
    }

   async publishMessage(publishTopic: string, message: any) {
        this.logger.info(`Published message =>, ${JSON.stringify(message)}`)
        this.logger.info(`Publish topic => ${publishTopic}`)

        const producer: Producer = this.kafka.producer()
        await producer.connect()
        await producer.send({
            topic: publishTopic,
            messages: [{
                value: JSON.stringify(message)
            }]
        })
        this.logger.info(`Message published to topic ${publishTopic}`)
   }

    async consumeMessage() {
        const consumer: Consumer = this.kafka.consumer({
            groupId: 'feature-trace-groupid-consume'
        })
        await consumer.connect()
        await consumer.subscribe({ topic: 'FEATURE_TRACE_TOPIC' })
        this.logger.info(`Consumer has started and listening to Kafka topic`)
        await consumer.run({
            eachMessage: async ({ message }) => {
                const messageObj: any = message.value?.toString()
                let data = JSON.parse(messageObj)
                let dataType = data.type
                let dataMessage = data.message
                let inputData = JSON.parse(Buffer.from(dataMessage, "base64").toString())
                await this.serviceFile.consumeAndInsertTraceData(inputData)
                .then((res) => {
                    this.logger.log(`result: , ${res}`)
                })
                .catch((e) => {
                    this.logger.log(`error: , ${e}`)
                })
            }
        })
    }

    async consumeLogMessage() {
        const consumer: Consumer = this.kafka.consumer({
            groupId: 'feature-log-groupid-consume'
        })
        await consumer.connect()
        await consumer.subscribe({ topic: 'LOG_MESSAGE_TOPIC' })
        this.logger.info(`Consumer has started and listening to Kafka topic`)
        await consumer.run({
            eachMessage: async ({ message }) => {
                const messageObj: any = message.value?.toString()
                let data = JSON.parse(messageObj)
                let dataType = data.type
                let dataMessage = data.message
                let inputData = JSON.parse(Buffer.from(dataMessage, "base64").toString())
                await this.serviceFile.consumeAndInsertLogData(inputData)
                .then((res) => {
                    this.logger.log(`result: , ${res}`)
                })
                .catch((e) => {
                    this.logger.log(`error: , ${e}`)
                })
            }
        })
    }
}
