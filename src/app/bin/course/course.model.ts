import { model, Schema } from "mongoose";
import { TCourse,  TCourseFaculty, TPreRequisiteCourses } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "CourseId is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: true
    },
    code: {
        type: Number,
        required: [true, "Code is required"]
    },
    credits: {
        type: Number,
        required: [true, "Credits is required"]
    },
    prefix: {
        type: String,
        required: [true, "Prefix is required"],
        unique: true
    },
    preRequisiteCourses: {
        type: [preRequisiteCoursesSchema]
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
   
    timestamps: true
})

courseSchema.pre('find', async function (next){
    this.find({isDeleted: {$ne: true}});
    next();
})
courseSchema.pre('findOne', async function(next){
    this.find({isDeleted: {$ne: true}});
    next();
})
export const Course = model<TCourse>('Course', courseSchema);


const courseFacultySchema = new Schema<TCourseFaculty>({
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty'
        }
    ]
})

export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);