import mongoose from 'mongoose';
import { DI } from "./di/DIContainer";
import { Logg } from "./logger/Logg";
import { MessagingService } from "./service/MessagingService";

class ConsumeService {
    private logger: Logg
    private messagingService: MessagingService

    constructor() {
        this.logger = DI.get(Logg)
        this.messagingService = DI.get(MessagingService)
    }

    public startConsume() {
        mongoose.connect('mongodb://127.0.0.1/message_logs')
        .then(res => console.log('MongoDB connected successfully'))
        .catch(e => console.log(e))
        this.messagingService.consumeMessage()
    }
}

const consumeApp = DI.get<ConsumeService>(ConsumeService)
consumeApp.startConsume()
