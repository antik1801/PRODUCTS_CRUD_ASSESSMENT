import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name:{
        type: String,
        required: true,
        unique: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

academicFacultySchema.pre('find', function(next){
    // console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
  })
  
academicFacultySchema.pre('findOne', function(next){
    // console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
  })


export const AcademicFaculty = model<TAcademicFaculty>("AcademicFaculty", academicFacultySchema);