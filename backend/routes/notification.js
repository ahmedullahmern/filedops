// routes/notification.js
import express from 'express'
import { getNotifications, markAsRead } from '../controllers/notification.js'
import { anyAuthMiddleware } from '../middleware/authVerfy.js'

const notificationRouter = express.Router()

notificationRouter.get('/', anyAuthMiddleware, getNotifications)
notificationRouter.put('/read/:id', anyAuthMiddleware, markAsRead)

export default notificationRouter



// // assignTechnician mein — job assign hone pe
// await Notification.create({
//     userId: req.body.technicianId,
//     jobId: job._id,
//     message: `New job assigned to you: ${job.title}`
// })

// // updateStatus mein — status change hone pe
// await Notification.create({
//     userId: job.clientId,
//     jobId: job._id,
//     message: `Your job "${job.title}" status changed to ${req.body.status}`
// })