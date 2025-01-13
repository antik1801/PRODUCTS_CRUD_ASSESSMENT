import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";
import httpStatus from "http-status";




const createAcademicFaculty = catchAsync(async(req:Request, res:Response)=>{
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Faculty created successfully",
        data: result
    })
})

const updateAcademicFaculty = catchAsync(async (req:Request, res:Response) =>{
    const {facultyId} = req.params;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(facultyId, req.params);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Faculty updated successfully",
        data: result
    })
})


const getAllAcademicFaculty = catchAsync(async (req:Request, res:Response) =>{
    const result = await academicFacultyServices.getAllAcademicFacultyFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Academic Faculty retieved successfully",
        data: result
    })
})

const getSingleAcademicFaculty = catchAsync(async (req:Request, res:Response)=>{
    const {facultyId} = req.params;
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Academic Faculty retrived successfully",
        data: result
    })
})

const deleteAcademicFaculty = catchAsync(async (req: Request, res: Response)=>{
    const {facultyId} = req.params;
    const result = await academicFacultyServices.deleteAcademicFacultyFromDB(facultyId);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message:"Academic Faculty Deleted Successfully",
        data: result
    })
})

export const academicFacultyController = {
    createAcademicFaculty,
    updateAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    deleteAcademicFaculty
}