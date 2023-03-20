import { Kafka, Producer, Consumer } from 'kafkajs';
import { DI } from '../di/DIContainer';
import { Logg } from '../logger/Logg';
import { Service } from './ServiceFile';

export class MessagingService {
    private kafka: Kafka = new Kafka({
        clientId: 'kafka-app',
        brokers: ['localhost:9092']
    })

    private logger: Logg
    private serviceFile: Service

    constructor() {
        this.logger = DI.get(Logg)
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
            eachMessage: async ({ topic, partition, message }) => {
                this.logger.info({ 
                    topic: topic, partition, offset: message.offset, 
                    value: message.value?.toString()
                })
                const messageObj = message.value?.toString()
                await this.serviceFile.consumeAndInsertData(messageObj)
                .then((res) => {
                    console.log('result: ',res)
                })
                .catch((e) => {
                    console.log('error: ', e)
                })
            }
        })
   }
}
