import User from '../models/auth.js';
import sendResponse from '../constant/sendRespose.js';

const anyUserControllers = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id
        console.log("user-->", userId)
        const user = await User.findById(userId).select('-password')
        return sendResponse(res, 200, user, false, "User Updated Successfully")
    } catch (error) {
        return sendResponse(res, 500, null, true, error.message)
    }
}

export default anyUserControllers