import express from 'express'
import { authControllers, deleteUserControllers, getAllUsersControllers, loginControllers } from '../controllers/auth.js'
import { anyAuthMiddleware, authenticationAdmin } from '../middleware/authVerfy.js'
import anyUserControllers from '../controllers/users.js'

const authRouter = express.Router()

authRouter.post('/register', authenticationAdmin, authControllers)
authRouter.post('/login', loginControllers)
authRouter.get('/allusers', authenticationAdmin, getAllUsersControllers)
authRouter.get('/myInfo', anyAuthMiddleware, anyUserControllers)
authRouter.delete('/deleteuser/:id', authenticationAdmin, deleteUserControllers)
export default authRouter