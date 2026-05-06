const devUrl = "http://localhost:3000"
const proudUrl = "https://beneficary-backend.vercel.app/"

export const Base_Url = devUrl

export const AppRoutes = {
    signup: Base_Url + "/api/auth/register",
    login: Base_Url + "/api/auth/login",
    getAllUser: Base_Url + "/api/auth/allusers",
    getMyInfo: Base_Url + "/api/auth/myInfo",
    createJob: Base_Url + "/api/job/createjob",
    getAlljobs: Base_Url + "/api/job/getalljobs",
    adminTechAssign: Base_Url + "/api/job/adminassignedstatus/:id",
    getTechnicain: Base_Url + "/api/job/gettechnician",
    technicainStatusUpdated: Base_Url + "/api/job/technicainupdatedstatus/:id",
    getClientJob: Base_Url + "/api/job/getclientstatus",
    Dashboard: Base_Url + "/api/admin/dashboard",
}