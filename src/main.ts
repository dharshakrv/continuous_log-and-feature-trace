import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import { TestController } from './controller/FeatureTraceController'
import { DI } from './di/DIContainer';
import { MessagingService } from './service/MessagingService';
const expressApp: express.Application = express()

class App {
    private messageService: MessagingService

    constructor() {
        this.messageService = DI.get(MessagingService)
    }

    initializeApp() {
        this.registerControllers()
        this.startServer()
    }

    startConsumerService() {
        // this.messageService.consumeMessage()
    }

    // Register controllers
    private async registerControllers() {
        expressApp.use(bodyParser.urlencoded({ extended: true }))
        expressApp.use(bodyParser.json())
        expressApp.use(cors())
        expressApp.use((req, res, next) => {
            DI.destroy();
            console.log(`URL, ${req.originalUrl}`);
            console.log(`METHOD, ${req.method}`);
            console.log(`HEADERS, ${req.headers}`)
            console.log(`BODY, ${req.body}`);
            next();
        });
        // Controllers
        expressApp.use('/message', DI.get<TestController>(TestController).getRouter())
    }

    private startServer() {
        mongoose.connect('mongodb://127.0.0.1/message_logs')
        .then(res => console.log('MongoDB connected successfully'))
        .catch(e => console.log(e))
        expressApp.listen(8888, () => {
            console.log('Application server started on PORT 8888')
        })
    }
}

const app = DI.get<App>(App);
app.initializeApp()
app.startConsumerService()
