/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response} from "express";
import { StudentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
// import JoiValidationSchema from "./student.joi.validation";


const getAllStudents = catchAsync(async (req:Request, res:Response) =>{
   
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    res.status(200).json({
        success: true,
        message: "Students are retrieved successfully",
        data: result
    })
})


const getSingleStudent = catchAsync(async(req:Request, res:Response) =>{

    const {studentId} = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single student retrieved successfully",
    data: result
   })


})

const deleteStudent = catchAsync(async(req:Request, res:Response) =>{
    
        
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId)

   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result
   });
})

const updateStudent = catchAsync(async (req:Request, res: Response) =>{
    const {studentId} = req.params;
    const result = await StudentServices.updateStudentIntoDB(studentId, req.params);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Student is updated successfully",
        data: result
    })
})

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent
};