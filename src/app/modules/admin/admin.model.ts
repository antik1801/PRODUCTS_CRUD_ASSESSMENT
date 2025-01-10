import { model, Schema } from "mongoose";
import { TAdmin, TUserName } from "./admin.interface";
import { BloodGroup, Genders } from "./admin.constant";

const userNameSchema = new Schema<TUserName>({
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


const adminSchema = new Schema<TAdmin>({
    id:{
        type: String,
        required: [true, "ID is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"]
    },
    designation: {
        type: String,
        required: [true, "designation is required"]
    },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: Genders,
            message: "{VALUE} must be male || female || others"
        },
        required: [true, "Gender is required"]
    },
    dateOfBirth: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: [true, "Emergency Contact No is required"]
    },
    bloodGroup:{
        type: String,
        enum:{
            values: BloodGroup,
            message: "{VALUE} is not a valid blood group"
        }
    },
    presentAddress:{
        type: String,
        required: [true, "Present address is required"]
    },
    permanentAddress: {
        type: String,
        required: [true, "Permanent address is required"]
    },
    profileImg: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false 
    }
},{
    toJSON:{
        virtuals: true
    }
})

adminSchema.virtual('fullName').get(function (){
    return(
        `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
      )
})

adminSchema.pre('find', function(next){
    // console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
  })
  
 adminSchema.pre('findOne', function(next){
    // console.log(this);
    this.find({isDeleted: {$ne: true}});
    next();
  })
adminSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: { isDeleted: {$ne: true} }})
    next();
  })

adminSchema.post('find', async function (docs,next){
    if (docs && docs.length > 0 && docs[0].user) {
        docs[0].user.password = '';
    }
    next();
})
adminSchema.post('findOne', async function (docs,next){
    if (docs && docs.length > 0 && docs[0].user) {
        docs[0].user.password = '';
    }
    next();
})

export const Admin = model<TAdmin>('Admin', adminSchema);