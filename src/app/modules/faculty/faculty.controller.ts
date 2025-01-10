import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";
import httpStatus from "http-status";



const getAllFaculties = catchAsync(async (req:Request, res:Response) =>{
    const result = await FacultyServices.getAllFacultyFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Faculty retrived successfully",
        data: result
    })
})


const getSingleFaculty = catchAsync(async (req:Request, res:Response)=>{
    const {facultyId} = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(facultyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Faculty retrived successfully",
        data: result
    })
})

const updateSingleFaculty = catchAsync(async (req:Request, res: Response) =>{
    const {facultyId} = req.params;
    const result = await FacultyServices.updateSingleFacultyFromDB(facultyId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Faculty successfully updated",
        data: result
    })
})

const deleteSingleFaculty = catchAsync(async (req:Request, res: Response) =>{
    const {facultyId} = req.params;
    const result = await FacultyServices.deleteSingleFacultyFromDB(facultyId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single faculty deleted successfully",
        data: result
    })
})

export const FacultyController = {
    getAllFaculties,
    getSingleFaculty,
    updateSingleFaculty,
    deleteSingleFaculty
}