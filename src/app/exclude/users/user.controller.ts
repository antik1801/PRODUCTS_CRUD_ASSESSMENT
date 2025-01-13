import { Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const createStudent = catchAsync(async (req: Request, res: Response) =>{
    const {password , student: studentData} = req.body;
   //  const zodParseData = studentValidationSchema.parse(studentData);
    const result = await userServices.createStudentInDB(password, studentData)
    
    sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: "Student created successfully",
       data: result
    });
  
})
 

const createFaculty = catchAsync(async (req:Request, res: Response)=>{
    const {password, faculty: facultyData} = req.body;
    const result = await userServices.createFacultyIntoDB(password, facultyData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Faculty is created successfully",
        data: result
    })
})

const createAdmin = catchAsync(async(req:Request, res:Response)=>{
    const {password, admin:adminData} = req.body;
    const result = await userServices.createAdminIntoDB(password, adminData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Admin is created successfully",
        data: result
    })
})

export const userControllers = {
    createStudent,
    createFaculty,
    createAdmin
}