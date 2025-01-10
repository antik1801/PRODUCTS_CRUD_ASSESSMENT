import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.service";
import httpStatus from "http-status";


const createAcademicDepartment = catchAsync(async (req:Request, res: Response)=>{

    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Department crated successfully",
        data: result
    })
})


const updateAcademicDepartment = catchAsync(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(id, req.body);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Department updated successfully",
        data: result
    })
})

const getAllAcademicDepartment = catchAsync(async(req:Request, res:Response) =>{
    const result = await academicDepartmentServices.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Department retrived successfully",
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Academic Department retrived successfully",
        data: result
    })
})

const deleteAcademicDepartment = catchAsync(async(req:Request, res:Response)=>{
    const {id} = req.params;
    const result = await academicDepartmentServices.deleteSingleAcademicDepartmentFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Department deleted successfully",
        data: result
    });
})

export const academicDepartmentControllers = {
    createAcademicDepartment,
    updateAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    deleteAcademicDepartment
}