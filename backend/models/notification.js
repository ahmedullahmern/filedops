// models/notification.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "users", 
        required: true 
    },
    jobId: { 
        type: Schema.Types.ObjectId, 
        ref: "job" 
    },
    message: { 
        type: String, 
        required: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true })

const Notification = mongoose.model("notification", notificationSchema)
export default Notification