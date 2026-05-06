import sendResponse from "../constant/sendRespose.js"
import Job from "../models/job.js"

const dashboard = async (req, res) => {
    try {
        const total = await Job.countDocuments()
        const pending = await Job.countDocuments({ status: "pending" })
        const assigned = await Job.countDocuments({ status: "assigned" })
        const inProgress = await Job.countDocuments({ status: "in-progress" })
        const completed = await Job.countDocuments({ status: "completed" })

        sendResponse(res, 200, {
            total,
            pending,
            assigned,
            inProgress,
            completed
        }, false, "Dashboard Data")
    } catch (error) {
        console.log("erro-->", error)
        sendResponse(res, 400, null, true, error.message)
    }

}

export default dashboard