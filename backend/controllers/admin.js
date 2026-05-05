import Job from "../models/job"

const dashboard = async (req, res) => {
    try {
        const total = await Job .countDocuments()
        const pending = await Job.countDocuments({ status: "pending" })
        const assigned = await Job.countDocuments({ status: "assigned" })
        const completed = await Job.countDocuments({ status: "completed" })

        sendResponse(res, 200, {
            total,
            pending,
            assigned,
            completed
        }, false, "Dashboard Data")
    } catch (error) {
        console.log("erro-->", error)
        sendResponse(res, 400, null, true, error.message)
    }

}

export default dashboard