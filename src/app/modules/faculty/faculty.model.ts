import { model, Schema } from "mongoose";
import { TFaculty, TName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";

const userNameSchema = new Schema <TName>({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    }
})


const facultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: [true, "Faculty Id is required"],  // System generated
            unique: true 
        },
        user:{
            type: Schema.Types.ObjectId,
            required: [true, "user (objectid) is required"], // System generated
            unique: true,
            ref: 'User'
        },
        designation:{
            type: String,
            required: [true, "Designation is required"]
        },
        name: {
            type: userNameSchema,
            required: [true, "Name is required"]
        },
        gender: {
            type: String,
            enum: {
                values: Gender,
                message: "{VALUE} is not a valid gender , [male, female, others]"
            },
            required: [true, "Gender is required"]
        },
        bloodGroup:{
            type: String,
            enum: {
                values: BloodGroup,
                message: "{VALUE} is not a valid blood group" 
            },
        },
        dateOfBirth:{
            type: Date
        },
        email:{
            type: String,
            required : [true, "Email is required"]
        },
        academicDepartment:{
            type: Schema.Types.ObjectId,
            ref: "AcademicDepartment",
            required: [true, "AcademicDepartment is required"]
        },
        contactNo:{
            type: String,
            required: [true, "ContactNo is required"]
        },
        emergencyContactNo:{
            type: String,
            required: [true, "EmergencyContactNo is required"]
        },
        permanentAddress:{
            type: String,
            required: [true, "PermanentAddress is required"]
        },
        profileImg:{
            type: String,
        },
        presentAddress: {
            type: String,
            required: [true, "PresentAddress is required"]
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

facultySchema.virtual('fullName').get(function(){
    return(
      `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
    )
  })
  

facultySchema.post('find', async function (docs,next){
    if (docs && docs.length > 0 && docs[0].user) {
        docs[0].user.password = '';
    }
    next();
})
facultySchema.post('findOne', async function (docs,next){
    if (docs && docs.length > 0 && docs[0].user) {
        docs[0].user.password = '';
    }

    next();
})

facultySchema.pre('find', function(next){
    // console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
})

facultySchema.pre('findOne', function(next){
    // console.log(this);
    console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
})

facultySchema.pre('aggregate', function(next){
    // console.log(this);
    this.pipeline().unshift({$match: { isDeleted: {$ne: true} }})
    next();
})

export const Faculty = model<TFaculty>('Faculty', facultySchema);