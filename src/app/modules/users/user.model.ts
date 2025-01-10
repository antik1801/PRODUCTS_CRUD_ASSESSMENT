import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        // will be set from the backend generated
        // steeing it from user.service.ts
    },
    password: {
        type: String,
        // required: true,
        // if user didn't give the password then it will be auto generated from system 
        // setting it from user.service.ts
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
        // no need to validate because default value
        // setting it from user.service.ts
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
        // will set it from api end points
        // setting it from user.service.ts
    },
    isDeleted: {
        type: Boolean,
        default: false,
        // no need to validate because default value
        // system generated
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
        // no need to validate because default value
        // system generated
    }
},
{
    timestamps: true
}
)


// build mongoose middlewares
userSchema.pre('save',async function(next){
    // console.log(this, "this is a pre hook middleware")
    
    this.password = await  bcrypt.hash(this.password, Number(config.bcrypt_salt_round));
    next();
})



export const User = model<TUser>('User', userSchema);

