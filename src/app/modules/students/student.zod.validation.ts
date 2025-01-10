import { z } from 'zod';
import validator from 'validator';

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z.string()
    .min(3, "First name is no more than 3 characters")
    .max(20, "First name should not have more than 20 characters")
    .trim()
    .refine(value => validator.isAlpha(value), { message: "{VALUE} is not a valid name" }),
  middleName: z.string(),
  lastName: z.string()
    .min(5, "Last name must have at least 5 characters")
    .max(20, "Last name must not have more than 20 characters")
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Last name is not in a valid format" })
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Father name is in capitalized format" }),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  motherName: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Mother name is not in a capitalized format" }),
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().trim()
});

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Name is not in a capitalized format" }),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim()
});

// Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      id: z.string(),
    name: userNameValidationSchema,
    gender: z.enum(["male", "female", "others"], { message: "{VALUE} is invalid, Gender must be one of the following 'male', 'female', 'others'" }),
    dateOfBirth: z.string().optional(),
    email: z.string()
      .trim()
      .refine(value => validator.isEmail(value), { message: "{VALUE} is not a valid email format" }),
    contactNo: z.string().trim(),
    emergencyContactNo: z.string().trim(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { message: "{VALUE} is invalid. Please provide a valid blood group" }).optional(),
    presentAddress: z.string().trim(),
    permanentAddress: z.string().trim(),
    gurdian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    admissionSemester: z.string(),
    academicDepartment: z.string(),
    isDeleted: z.boolean().optional().default(false)
    })
  })
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).max(20).optional(),
})

const updateGurdianValidationSchema = z.object({
  fatherName: z.string()
  .trim()
  .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Father name is in capitalized format" }).optional(),
fatherOccupation: z.string().trim().optional(),
fatherContactNo: z.string().trim().optional(),
motherName: z.string()
  .trim()
  .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Mother name is not in a capitalized format" }).optional(),
motherOccupation: z.string().trim().optional(),
motherContactNo: z.string().trim().optional()
})

const updateLocalGuardianValidationSchema = z.object({
  name: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Name is not in a capitalized format" }).optional(),
  occupation: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  address: z.string().trim().optional()
});


const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'others']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { message: "{VALUE} is invalid. Please provide a valid blood group" }).optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      gurdian: updateGurdianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
    admissionSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
    isDeleted: z.boolean().optional()
    })
  })
})

export const studentValidationSchema = { createStudentValidationSchema , updateStudentValidationSchema }
