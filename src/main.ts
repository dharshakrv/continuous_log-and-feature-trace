import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { FeatureTraceController } from './controller/FeatureTraceController'
import { DI } from './di/DIContainer';
import { DBConnection } from './config/DBConnection';
import { initModels } from './data/entity/init-models';
const expressApp: express.Application = express()

import morgan from 'morgan';
import dotenv from 'dotenv';
import { CriteriaSearchController } from './controller/CriteriaSearchController';
import { ChartController } from './controller/ChartController';
dotenv.config();

class App {

    private dbConnection: DBConnection;

    constructor() {
        this.dbConnection = DI.get(DBConnection);
    }

    initializeRepositories() {
        initModels(this.dbConnection.connection);
    }

    initializeApp() {
        this.registerControllers()
        this.startServer()
    }

    // Register controllers
    private async registerControllers() {
        this.initializeRepositories()
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
        expressApp.use(`${process.env.BASE_URL}/criteria`, DI.get<CriteriaSearchController>(CriteriaSearchController).getRouter())
        expressApp.use(`${process.env.BASE_URL}/chart`, DI.get<ChartController>(ChartController).getRouter())
    }

    private startServer() {
        expressApp.listen(process.env.PORT, () => {
            console.log('Application server started on PORT ', process.env.PORT)
        })
    }
}

const app = DI.get<App>(App);
app.initializeApp()
