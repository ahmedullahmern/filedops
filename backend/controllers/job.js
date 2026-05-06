import sendResponse from "../constant/sendRespose.js";
import User from "../models/auth.js";
import Job from "../models/job.js";
import { jobValidationSchema } from "../validation/jobValidation.js";

const createJob = async (req, res) => {
    try {
        const { error, value } = jobValidationSchema.validate(req.body);
        if (error) return sendResponse(res, 400, null, true, error.message)
        let newUser = new Job({ ...value, client: value.clientId });
        newUser = await newUser.save()
        sendResponse(res, 201, newUser, false, "Job Created")
    } catch (error) {
        console.log("erro-->", error)
        sendResponse(res, 400, null, true, error.message)
    }

}

const assignTechnician = async (req, res) => {
    try {
        const technician = await User.findOne({
            _id: req.body.technicianId,
            role: "technician"
        })
        if (!technician) {
            return sendResponse(res, 404, null, true, "Technician not found")
        }

        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { technicianId: req.body.technicianId, status: "assigned" },
            { new: true, runValidators: true }
        ).populate({ path: "clientId", select: "name email" })
            .populate({ path: "technicianId", select: "name email" })


        sendResponse(res, 201, job, false, "Technicain Assigned")
    } catch (error) {
        console.log("error-->", error)
        sendResponse(res, 400, null, true, error.message)
    }

}

//  technicain apna job dekhe ga
const myJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            technicianId: req.user.id
        }).populate({ path: "technicianId", select: "name email" })
            .populate({ path: "clientId", select: "name email" })
        sendResponse(res, 201, jobs, false, "Technicain Job Fetched")
    } catch (error) {
        console.log("error-->", error)
        sendResponse(res, 400, null, true, error.message)
    }

}

const getAlljob = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate({
                path: "technicianId",
                select: "name email"   // jo fields chahiye
            })
            .populate({
                path: "clientId",
                select: "name email"
            });

        sendResponse(res, 200, jobs, false, "All Jobs Fetched");
    } catch (error) {
        console.log("error-->", error);
        sendResponse(res, 400, null, true, error.message);
    }
};

// Technicain Apna Status Updated karega

const updateStatus = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id
        const job = await Job.findOne({
            _id: req.params.id,
            technicianId: userId
        })
        if (!job) {
            return sendResponse(res, 403, null, true, "Not your job")
        }
        job.status = req.body.status
        await job.save()
        sendResponse(res, 200, job, false, "Status Updated")
    } catch (error) {
        console.log("error-->", error)
        sendResponse(res, 400, null, true, error.message)
    }
}

const addNoteControllers = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    notes: {
                        text: req.body.text,
                        addedBy: userId
                    }
                }
            },
            { new: true }
        )
        if (!job) return sendResponse(res, 404, null, true, "Job not found")
        sendResponse(res, 200, job, false, "Note Added")
    } catch (error) {
        sendResponse(res, 400, null, true, error.message)
    }
}

const clientJobs = async (req, res) => {
    try {
        console.log("req.user._id", req.user._id)
        const jobs = await Job.find({
            clientId: req.user._id
        }).populate({ path: "clientId", select: "name email" })
        sendResponse(res, 201, jobs, false, "Client JOb Fetched")
    } catch (error) {
        console.log("error-->", error)
        sendResponse(res, 400, null, true, error.message)
    }

}

export {addNoteControllers, getAlljob, createJob, assignTechnician, myJobs, updateStatus, clientJobs }