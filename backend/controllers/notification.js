// controllers/notification.js
import Notification from "../models/notification.js"
import sendResponse from "../constant/sendRespose.js"

// Meri notifications fetch karo
const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id
        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })  // Latest pehle
        sendResponse(res, 200, notifications, false, "Notifications Fetched")
    } catch (error) {
        sendResponse(res, 400, null, true, error.message)
    }
}

// Notification read mark karo
const markAsRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true }
        )
        sendResponse(res, 200, null, false, "Marked as read")
    } catch (error) {
        sendResponse(res, 400, null, true, error.message)
    }
}

export { getNotifications, markAsRead }