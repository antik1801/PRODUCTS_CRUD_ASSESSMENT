import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync"
import { semesterRegistrationServices } from "./semesterRegistration.service"
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createSemesterRegistration = catchAsync(async (req:Request, res:Response) =>{
        const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Academic semester registration is created successfully",
            data: result
        })
})

const getAllSemesterRegistration = catchAsync(async (req:Request, res:Response) =>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Semester Registrations retrived successfully",
        data: result
    })
})

const getSingleSemesterRegistration = catchAsync(async (req:Request, res:Response)=>{
    const {semesterRegistrationId} = req.params;
    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(semesterRegistrationId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Semester Registration retrieved successfully",
        data: result
    })
})

const updateSemesterRegistration = catchAsync(async (req:Request, res:Response) =>{
    const {semesterRegistrationId} = req.params;
    const semesterRegistrationData = req.body;
    const result = await semesterRegistrationServices.updateSemesterRegistrationFromDB(semesterRegistrationId, semesterRegistrationData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester registration updated successfully",
        data: result
    })
})

export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}