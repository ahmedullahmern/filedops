import express from 'express'
import { authControllers, loginControllers } from '../controllers/auth.js'
import { authenticationAdmin, authenticationClient, authenticationTechnician } from '../middleware/authVerfy.js'
import { assignTechnician, clientJobs, createJob, getAlljob, myJobs, updateStatus } from '../controllers/job.js'

const jobRouter = express.Router()

jobRouter.post('/createjob', authenticationAdmin, createJob)
jobRouter.get('/getalljobs', authenticationAdmin, getAlljob)
jobRouter.put('/adminassignedstatus/:id', authenticationAdmin, assignTechnician)
jobRouter.get('/gettechnician', authenticationTechnician, myJobs)
jobRouter.put('/technicainupdatedstatus/:id', authenticationTechnician, updateStatus)
jobRouter.get('/getclientstatus', authenticationClient, clientJobs)

export default jobRouter