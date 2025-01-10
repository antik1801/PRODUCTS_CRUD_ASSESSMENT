import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: [true, "academicSemester is required"],
    },
    status: {
      type: String,
      enum: {
        values: SemesterRegistrationStatus,
        message: "{VALUE} is not a valid status",
      },
    },
    startDate: {
      type: String,
      required: [true, "startDate is required"],
    },
    endDate: {
      type: String,
      required: [true, "endDate is required"],
    },
    minCredit: {
      type: Number,
      required: [true, "minCredit is required"],
    },
    maxCredit: {
      type: Number,
      required: [true, "maxCredit is required"],
    },
  },
  {
    timestamps: true,
  }
);

semesterRegistrationSchema.pre('save', async function (next){
  const isAcademicSemesterExists = await AcademicSemester.findById(this.academicSemester);
  if(!isAcademicSemesterExists)
  {
    throw new AppError(httpStatus.NOT_FOUND, "academicSemester doesnot exists")
  }
  next();
})


export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
