import mongoose, { Document, Schema } from 'mongoose'

interface Traceobj extends Document {
    parent_trace_id: String,
    feature_trace_name: String,
    feature_createdAt: Date,
    feature_trace: Object,
    createdAt: Date,
    updatedAt: Date
}

const traceObj: Schema = new Schema({
    parent_trace_id: {
        type: String,
        required: true
    },
    feature_trace_name: {
        type: String,
        required: true
    },
    feature_createdAt: {
        type: Date,
        required: true
    },
    feature_trace: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const TraceObjModel = mongoose.model<Traceobj>("traceObj", traceObj)
export default TraceObjModel
