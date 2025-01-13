/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
// import { Student } from "../students/student.model";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";

import { Admin } from "../admin/admin.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // we have to create a user object

  // since we are using some partial property field in TUser so we can say partial<TUser>
  const userData: Partial<TUser> = {};

  // inside user object we have to check whether password is given or not
  userData.password = password || (config.default_password as string);

  // we have to set the role of the user --> student
  userData.role = "student";

  // set the student id
  // userData.id = "203010001";

  // find academic semester information
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  // Ensure admission semester can not NULL
  if (!admissionSemester) {
    throw new Error(
      "Admission semester not found in database or the value is NULL"
    );
  }
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );
  if (!academicDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic department does not exists in DATABASE"
    );
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error("New User can not be null");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    console.log({ newUser });
    const newStudent = await Student.create([payload], { session });
    console.log({ newStudent });
    if (!newStudent.length) {
      throw new Error("New Student cant not be null");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create student");
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "faculty";

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create new Faculty"
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentInDB: createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
