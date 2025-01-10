import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import { AcademicSemester } from "../academicSemester/academicSemester.model";


const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) =>{
     
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [
            {status: RegistrationStatus.UPCOMING},
            {status: RegistrationStatus.ONGOING}
        ]
       })
       if(isThereAnyUpcomingOrOngoingSemester){
        throw new AppError(httpStatus.BAD_REQUEST, "There is a registered semester");
       }
    
       const academicSemester = payload?.academicSemester;
       const currentSemester = await AcademicSemester.findOne({academicSemester});
       if(currentSemester)
       {
        throw new AppError(httpStatus.BAD_REQUEST, "This current semester is already exists");
       }
       const result = await SemesterRegistration.create(payload);
       return result
}

const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) =>{
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate("academicSemester"), query)
    .filter()
    .sort()
    .paginate()
    const result = semesterRegistrationQuery.modelQuery;
    return result;
}

const getSingleSemesterRegistrationFromDB = async (id: string) =>{
    const result = await SemesterRegistration.findById(id);
    return result;
}

const updateSemesterRegistrationFromDB = async (id: string, payload: Partial<TSemesterRegistration>) =>{
 
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

    if(!isSemesterRegistrationExists)
    {
        throw new AppError(httpStatus.BAD_REQUEST, "This semester registration is not exists in database")
    }

    const currentSemesterRegistrationStatus = isSemesterRegistrationExists?.status;
    if(currentSemesterRegistrationStatus === RegistrationStatus.ENDED)
    {
        throw new AppError(httpStatus.BAD_REQUEST, "This semester registration status is already ended")
    }

    const requestSemesterRegistrationStatus = payload?.status;
    if(currentSemesterRegistrationStatus === RegistrationStatus.UPCOMING && requestSemesterRegistrationStatus === RegistrationStatus.ENDED)
    {
        throw new AppError(httpStatus.BAD_REQUEST, "You can't change any semester registration from UPCOMING to ENDED")
    }
    if(currentSemesterRegistrationStatus === RegistrationStatus.ONGOING && requestSemesterRegistrationStatus === RegistrationStatus.UPCOMING)
    {
        throw new AppError(httpStatus.BAD_REQUEST, "You can't change any semester registration status from ONGOING to UPCOMING")
    }
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return result;
}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationFromDB
}