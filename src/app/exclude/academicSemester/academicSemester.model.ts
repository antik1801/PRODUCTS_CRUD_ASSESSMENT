import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCodes, academicSemesterNames, months } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: academicSemesterNames,
            required: true,
        },
        code: {
            type: String,
            enum: academicSemesterCodes,
            required: true
        },
        year: {
            type: String,
            required: true,
        },
        startMonth:{
            type: String,
            enum: months,
            required: true,
        },
        endMonth:
        {
            type: String,
            enum: months,
            required: true
        },
        isDeleted:
        {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
)


academicSemesterSchema.pre("save",async function (next){
    const isAcademicSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })
    if(isAcademicSemesterExists)
    {
        throw new Error("This academic semester is already existed")
    }
    next();
})

academicSemesterSchema.pre('find', function(next){
    // console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
  })
  
academicSemesterSchema.pre('findOne', function(next){
    // console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
  })
  

export const AcademicSemester =  model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);