import express from 'express'
import { authenticationAdmin } from '../middleware/authVerfy.js'
import dashboard from '../controllers/admin.js'

const adminRouter = express.Router()

adminRouter.get('/dashboard', authenticationAdmin, dashboard)

export default adminRouter