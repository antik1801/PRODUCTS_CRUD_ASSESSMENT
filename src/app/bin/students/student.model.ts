/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Schema, model } from "mongoose";
import {
  TGardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  TUserName,
  StudentModel,
} from "./student.interface";
import validator from "validator";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name is no more than 3 charecter"],
    maxlength: [20, "First name should not have more than 20 charector"],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not a valid name",
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [5, "Last name have at least 5 charector"],
    maxlength: [20, "Last name have not more than 20 charector"],
    trim: true,
    validate: {
      validator: function (value: string): boolean {
        const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== capitaliseFormat) {
          return false;
        }
        return true;
      },
      message: "Last name is not in a valid format",
    },
  },
});

const gardianSchema = new Schema<TGardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,
    validate: {
      validator: function (value: string): boolean {
        const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== capitaliseFormat) {
          return false;
        }
        return true;
      },
      message: "Father name is in capitalized format",
    },
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact number is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"],
    trim: true,
    validate: {
      validator: function (value: string): boolean {
        const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== capitaliseFormat) {
          return false;
        }
        return true;
      },
      message: "Mother name is not in a capitalized format",
    },
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother occupation is required"],
    trim: true,
  },
});

const localGardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
    trim: true,

    validate: function (value: string): boolean {
      const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== capitaliseFormat) {
        return false;
      }
      return true;
    },
  },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User Id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is requires"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message:
          "{VALUE} is invalid, Gender must be one of the following 'male' 'female' 'others'",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not a valid email format",
      },
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is invalid Please provide a valid blood group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    gurdian: {
      type: gardianSchema,
      required: [true, "Guardian's information is required"],
    },
    localGuardian: {
      type: localGardianSchema,
      required: [true, "Local guardian's information is required"],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// creating an Instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// creating a static custom method mostly like instance methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
studentSchema.post("find", async function (docs, next) {
  docs[0].user.password = "";
  next();
});

studentSchema.pre("save", async function (next) {
  const isAcademicSemesterExists = await AcademicSemester.findById(
    this.admissionSemester
  );
  // console.log(isAcademicSemesterExists);
  if (!isAcademicSemesterExists || isAcademicSemesterExists.isDeleted) {
    throw new Error("Academic semester does not exists");
  }
  next();
});
// studentSchema.pre('save', async function(next){
//   const isAcademicDepartmentExists = await AcademicDepartment.findById(this.academicDepartment);
//   if(isAcademicDepartmentExists)
//   {
//     throw new AppError(httpStatus.NOT_FOUND, "This Academic department does not found in the Database");
//   }
//   next();
// })

studentSchema.pre("find", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

// studentSchema.post('save', function(doc,next){
//   // console.log(this, "this is a post hook middleware")
//   doc.password="";
//   next()
// })

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
