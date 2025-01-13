/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { academicSemesterServices } from "./academicSemester.service";



const createAcademicSemester = catchAsync(async(req: Request, res: Response) =>{
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Semester successfully created",
        data: result
    })
})

const getAllAcademicSemester = catchAsync(async(req:Request, res:Response) =>{
    const result = await academicSemesterServices.getAllAcademicSemesterFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Semesters successfully retrieved",
        data: result
    })
})


const getSingleAcademicSemester = catchAsync(async (req: Request, res: Response) =>{

    const {semesterId} = req.params;

    const result = await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Academic Semester successfully retrieved",
        data: result
    })
})

const updateSingleAcademicSemester = catchAsync(async(req: Request, res: Response)=>{
    const {semesterId} = req.params;
    const result = await academicSemesterServices.updateSingleAcademicSemesterFromDB(semesterId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single academic semester updated successfully",
        data: result
    })
})

const deleteSingleAcademicSemester = catchAsync(async(req: Request,res: Response) =>{
    const {semesterId} = req.params;
    const result = await academicSemesterServices.deleteSingleAcademicSemesterFromDB(semesterId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Academic Semester Deleted successfully",
        data: {}
    })
})

export const academicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateSingleAcademicSemester,
    deleteSingleAcademicSemester
}