import { Consumer, Kafka } from 'kafkajs';
import { Service } from '../service/ServiceFile';
import { DI } from '../di/DIContainer';

const traceGroupId: any = process.env.FEATURE_TRACE_GROUP_ID!
const logGroupId: any = process.env.LOG_MESSAGE_GROUP_ID!

const traceKafkaTopic: any = process.env.FEATURE_TRACE_CONSUME_TOPIC!
const logKafkaTopic: any = process.env.LOG_MESSAGE_CONSUME_TOPIC!

export class KafkaService {
    private kafka: Kafka
    private traceConsumer: Consumer
    private logConsumer: Consumer
    private serviceFile: Service

    // private logger: Logg = DI.get(Logg)
    // private serviceFile: Service = DI.get(Service)

    constructor() {
        this.kafka = new Kafka({
            clientId: 'kafka-app',
            brokers: ['localhost:9092']
        })
        this.traceConsumer = this.kafka.consumer({ groupId: traceGroupId })
        this.logConsumer = this.kafka.consumer({ groupId: logGroupId })
        this.serviceFile = DI.get(Service)
    }

    async start() {
        this.connect()
        await this.traceConsumer.subscribe({ topic: traceKafkaTopic })
        await this.logConsumer.subscribe({ topic: logKafkaTopic })
        this.consumeTraceMessage()
        this.consumeLogMessage()
    }

    async connect() {
        await this.traceConsumer.connect()
        .then(() => { console.log('connected to trace consumer') })
        .catch((e) => { console.log('unable to connect to trace consumer', e) })
        await this.logConsumer.connect()
        .then(() => { console.log('connected to log consumer') })
        .catch((e) => { console.log('unable to connect to log consumer', e) })
    }

    async consumeTraceMessage() {
        this.traceConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageObj: any = message.value?.toString()
                let data = JSON.parse(messageObj)
                let dataType = data.type
                let dataMessage = data.message
                let inputData = JSON.parse(Buffer.from(dataMessage, "base64").toString())
                await this.serviceFile.consumeAndInsertTraceData(inputData)
            }
        })
    }

    async consumeLogMessage() {
        this.logConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageObj: any = message.value?.toString()
                let data = JSON.parse(messageObj)
                let dataType = data.type
                let dataMessage = data.message
                let inputData = JSON.parse(Buffer.from(dataMessage, "base64").toString())
                await this.serviceFile.consumeAndInsertLogData(inputData)
            }
        })
    }
}
