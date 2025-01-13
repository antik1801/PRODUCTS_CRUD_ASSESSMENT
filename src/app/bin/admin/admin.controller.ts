import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



const getAllAdmins = catchAsync(async (req:Request, res:Response)=>{
    const result = await adminServices.getAllAdminsFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All admins retrive successfully",
        data: result
    })
})


const getSingleAdmin = catchAsync(async (req: Request, res:Response) =>{
    const {adminId} = req.params;
    const result = await adminServices.getSingleAdminFromDB(adminId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single admin fetched successfully",
        data: result
    })
})

const deleteSingleAdmin = catchAsync(async (req:Request, res:Response) =>{
    const {adminId} = req.params;
    const result = await adminServices.deleteSingleAdminFromDB(adminId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single admin deleted successfully",
        data: result
    })
})

export const adminControllers = {
    getAllAdmins,
    getSingleAdmin,
    deleteSingleAdmin
}