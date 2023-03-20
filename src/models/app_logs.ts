import mongoose, { Document, Schema } from 'mongoose'

interface AppLogs extends Document {
    message_log: Object,
    logType: String
    createdAt: Date,
    updatedAt: Date
}

const appLogs: Schema = new Schema({
    message_log: {
        type: String
    },
    logType: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const AppLogsModel = mongoose.model<AppLogs>("appLogs", appLogs)
export default AppLogsModel
