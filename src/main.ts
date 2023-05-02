import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { FeatureTraceController } from './controller/FeatureTraceController'
import { DI } from './di/DIContainer';
const expressApp: express.Application = express()

import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

class App {

    initializeApp() {
        this.registerControllers()
        this.startServer()
    }

    // Register controllers
    private async registerControllers() {
        expressApp.use(morgan('combined'))
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
        expressApp.use(`${process.env.BASE_URL}/trace`, DI.get<FeatureTraceController>(FeatureTraceController).getRouter())
    }

    private startServer() {
        expressApp.listen(process.env.PORT, () => {
            console.log('Application server started on PORT ', process.env.PORT)
        })
    }
}

const app = DI.get<App>(App);
app.initializeApp()
