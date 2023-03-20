import { DI } from "../di/DIContainer"

const kafka = require('kafka-node')

export class KafkaService {
    private client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' })
    private producer: any
    private consumer: any

    private DBUtil: any
    constructor() {
        this.DBUtil = DI.get(this.DBUtil)
    }

    initializeKafka() {
        this.producer = new kafka.producer(this.client)
        this.producer.on('ready', function(){
            console.log('Producer is ready');
        });
        
        this.producer.on('error', (err: any) => {
            console.log('Producer is in error state');
            console.log(err);
        });
    }

    async publishMessage(topic: string, message: any) {
        try {
            this.producer.send([{ topic: topic, messages: JSON.stringify(message), partition: 0 }], 
                (err: any, message: any) => {
                    console.log(JSON.stringify(message))
            })
        }
        catch(err) {
            console.error(err)
        }
    }

    async consumeMessage() {
        const options = {
            kafkaHost: 'localhost:29092',
            groupId: 'kafka-app',
            autoCommit: true,
            autoCommitIntervalMs: 5000,
            sessionTimeout: 15000,
            fetchMaxBytes: 10 * 1024 * 1024,
            protocol: ['range'],
            fromOffset: 'latest',
        };
        this.consumer = new kafka.ConsumerGroup(options, 'LOG_MESSAGE_TOPIC')
        this.consumer.on('message', async (message: any) => {
            const messageObj = message.value.toString()
            const res = await this.DBUtil.dbInsertLogs(messageObj, 'info')
        })
    }
}