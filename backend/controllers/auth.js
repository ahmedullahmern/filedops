import sendResponse from "../constant/sendRespose.js";
import User from "../models/auth.js";
import jwt from 'jsonwebtoken'
import { loginSchema, signupSchema } from "../validation/authValidation.js";
import bcrypt from 'bcrypt'
import ENV from '../constant/index.js'
import Job from "../models/job.js";

const authControllers = async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body);
        if (error) return sendResponse(res, 400, null, true, error.message)
        const user = await User.findOne({ email: value.email }).lean()
        if (user) return sendResponse(res, 403, null, true, "User With This Email already Exist")
        const hashedPassword = await bcrypt.hash(value.password, 12)
        value.password = hashedPassword;
        let newUser = new User({ ...value });
        var token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, ENV.AUTH_SECRET);
        newUser = await newUser.save()
        sendResponse(res, 201, { newUser, token }, false, "User Register successfully")
    } catch (error) {
        sendResponse(res, 400, null, true, error.message)
        console.log("errror-->", error)
    }
};

const loginControllers = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) return sendResponse(res, 400, null, true, error.message)
        const user = await User.findOne({ email: value.email }).lean()
        if (!user) return sendResponse(res, 403, null, true, "User not Registered.")
        const isPasswordValid = await bcrypt.compare(value.password, user.password)
        if (!isPasswordValid) return sendResponse(res, 403, null, true, "Invalid  Credentails")
        var token = jwt.sign({ id: user._id, email: user.email, role: user.role }, ENV.AUTH_SECRET);
        sendResponse(res, 200, { user, token }, false, "User Login successfully")

    } catch (error) {
        sendResponse(res, 400, null, true, error.message)
        console.log("errror-->", error)
    }
}
// controllers/auth.js mein deleteUser:
const deleteUserControllers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return sendResponse(res, 404, null, true, "User not found")

        // Technician delete hone pe
        if (user.role === 'technician') {
            const affectedJobs = await Job.updateMany(
                {
                    technicianId: user._id,
                    status: { $in: ["assigned", "in-progress"] }
                },
                {
                    technicianId: null,
                    status: "pending"  // Wapas pending
                }
            )
            console.log(`${affectedJobs.modifiedCount} jobs wapas pending ho gayi`)
        }

        // Client delete hone pe
        if (user.role === 'client') {
            // Client ki saari incomplete jobs cancel karo
            await Job.updateMany(
                {
                    clientId: user._id,
                    status: { $in: ["pending", "assigned", "in-progress"] }
                },
                {
                    status: "cancelled"  // Cancel ho jayein
                }
            )
            console.log(`Client ki jobs cancel ho gayi`)
        }

        await User.findByIdAndDelete(req.params.id)
        sendResponse(res, 200, null, false, "User deleted successfully")

    } catch (error) {
        sendResponse(res, 400, null, true, error.message)
    }
}

export { authControllers, loginControllers, deleteUserControllers }




// models/auth.js mein add karo:
// import Job from './job.js'

// userSchema.pre('findOneAndDelete', async function(next) {
//     try {
//         const user = await this.model.findOne(this.getFilter())
        
//         if (user && user.role === 'technician') {
//             // Us technician ki saari active jobs ko unassign karo
//             await Job.updateMany(
//                 { 
//                     technicianId: user._id,
//                     status: { $in: ["assigned", "in-progress"] }
//                 },
//                 { 
//                     technicianId: null,
//                     status: "pending"  // Wapas pending pe aa jaye
//                 }
//             )
//         }
//         next()
//     } catch (error) {
//         next(error)
//     }
// })