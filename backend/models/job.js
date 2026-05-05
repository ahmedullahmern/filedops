import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "assigned", "in-progress", "completed", "cancelled"],
        default: "pending"
    },

    technicianId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false
    },

    clientId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    scheduledAt: {
        type: Date,
        default: null
    },

    notes: [{
        text: { type: String },
        addedBy: { type: Schema.Types.ObjectId, ref: "users" },
        createdAt: { type: Date, default: Date.now }
    }]

}, { timestamps: true })

const Job = mongoose.model("job", jobSchema)
export default Job;
