import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        required: true,
        type: String,
        default: "client",
        enum: ["technician", "client"],
    }

}, { timestamps: true })



const User = mongoose.model("users", userSchema)

export default User;