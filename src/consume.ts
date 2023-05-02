import mongoose from 'mongoose';
import { DI } from "./di/DIContainer";
import { Logger } from "./logger/Logger";
import { KafkaService } from './kafka/KafkaService';

import dotenv from 'dotenv';
dotenv.config()

class ConsumeService {
    private logger: Logger
    private kafkaService: KafkaService

    constructor() {
        this.logger = DI.get(Logger)
        this.kafkaService = DI.get(KafkaService)
    }

    public startConsume() {
        // mongoose.connect(`mongodb://rvtenant:rvtenant%402021@52.140.66.173:27017/`)
        // `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, { auth: { username: process.env.MONGO_USER!, password: process.env.MONGO_PASS! }, maxPoolSize: 10 }
        // .then(res => console.log('MongoDB connected successfully'))
        // .catch(e => console.log(e))
        console.log(mongoose.connection.readyState)
        this.kafkaService.start()
    }
}

const consumeApp = DI.get<ConsumeService>(ConsumeService)
consumeApp.startConsume()
