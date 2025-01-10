import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";



const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name:{
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

academicDepartmentSchema.pre("save", async function (next){
    const isDepartmentExists = await AcademicDepartment.findOne({name: this.name})
    if(isDepartmentExists)
    {
        throw new Error(`${this.name} already exists`);
    }
    next();
})

academicDepartmentSchema.pre("save", async function(next){
    const isAcademicFacultyExists = await AcademicFaculty.findById(this.academicFaculty);
    if(!isAcademicFacultyExists)
    {
        throw new AppError(httpStatus.NOT_FOUND, "This Academic faculty is not exists in database");
    }
    next();
})

academicDepartmentSchema.pre("findOneAndUpdate", async function (next){
    const departmentId = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(departmentId);
    if(!isDepartmentExists)
    {
        throw new Error(`This department does not exist in database`);
    }
    next();
})

academicDepartmentSchema.pre('find', async function (next){
    this.find({isDeleted: {$ne: true}});
    next();
})

academicDepartmentSchema.pre('findOne', async function (next){
    this.find({isDeleted: {$ne: true}});
    next();
})


export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)