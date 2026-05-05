import ENV from '../constant/index.js'
import jwt from 'jsonwebtoken'
import sendResponse from '../constant/sendRespose.js'
import User from '../models/auth.js'

export async function authenticationAdmin(req, res, next) {
    try {
        const bearerToken = req?.headers?.authorization
        if (!bearerToken) return sendResponse(res, 403, null, true, "Token not Provide")

        const token = bearerToken?.split(" ")[1]
        const decoded = jwt.verify(token, ENV.AUTH_SECRET)
        if (!decoded) return sendResponse(res, 403, null, true, "Worng Token")
        req.user = decoded
        if (decoded.role == "admin") {
            next()
        } else {
            return sendResponse(res, 403, null, true, "Admin Only allewd to access")
        }
    } catch (error) {
        console.log("error-->", error)
        return sendResponse(res, 500, null, true, error.message)
    }
}

export async function authenticationTechnician(req, res, next) {
    try {
        const bearerToken = req?.headers?.authorization
        if (!bearerToken) return sendResponse(res, 403, null, true, "Token not Provide")

        const token = bearerToken?.split(" ")[1]
        const decoded = jwt.verify(token, ENV.AUTH_SECRET)
        if (!decoded) return sendResponse(res, 403, null, true, "Worng Token")
        req.user = decoded
        if (decoded.role == "technician") {
            next()
        } else {
            return sendResponse(res, 403, null, true, "Technician Only allewd to access")
        }
    } catch (error) {
        console.log("error-->", error)
        return sendResponse(res, 500, null, true, error.message)
    }
}

export async function authenticationClient(req, res, next) {
    try {
        const bearerToken = req?.headers?.authorization
        if (!bearerToken) return sendResponse(res, 403, null, true, "Token not Provide")

        const token = bearerToken?.split(" ")[1]
        const decoded = jwt.verify(token, ENV.AUTH_SECRET)
        if (!decoded) return sendResponse(res, 403, null, true, "Worng Token")
        req.user = decoded
        if (decoded.role == "client") {
            next()
        } else {
            return sendResponse(res, 403, null, true, "Client Only allewd to access")
        }
    } catch (error) {
        console.log("error-->", error)
        return sendResponse(res, 500, null, true, error.message)
    }
}



export async function anyAuthMiddleware(req, res, next) {
    try {
        const bearerToken = req?.headers?.authorization
        const token = bearerToken?.split(" ")[1]
        if (!token) return sendResponse(res, 403, null, true, "Token not Provide")
        const decoded = jwt.verify(token, process.env.AUTH_SECRET)
        if (decoded) {
            const user = await User.findById(decoded._id)
            if (!user) {
                return sendResponse(res, 403, null, true, "User Not Found")
            }
            req.user = decoded
            next()
        } else {
            return sendResponse(res, 500, null, true, "SomeThing Went Worng")
        }
    } catch (error) {
        return sendResponse(res, 500, null, true, "SomeThing Went Worng")
    }
}