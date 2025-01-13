
import { z } from 'zod'
import { BloodGroup, Gender } from './faculty.constant'

const createFacultyUserNameValidationSchema = z.object({
    firstName: z.string({required_error: "firstName must be required"}),
    middleName: z.string().optional(),
    lastName: z.string({required_error: "lastName must be required"})
})

const updateFacultyUserNameValidationSchema = z.object({
    firstName: z.string({required_error: "firstName must be required"}).optional(),
    middleName: z.string().optional(),
    lastName: z.string({required_error: "lastName must be required"}).optional()
})



const createFacultyValidationSchema = z.object({
    body: z.object({
        faculty:  z.object({
            designation: z.string({invalid_type_error: "Designation must be a string", required_error:"Designation must be required"}),
            name: createFacultyUserNameValidationSchema,
            gender: z.enum([...Gender] as [string, ...string[]]),
            dateOfBirth: z.string(),
            email: z.string().email(),
            bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
            contactNo: z.string({required_error: "contactNo is required"}),
            emergencyContactNo: z.string({required_error: "emergencyContactNo is required"}),
            presentAddress: z.string({required_error: "presentAddress is required"}),
            permanentAddress: z.string({required_error: "permanentAddress is required"}),
            profileImg: z.string().optional(),
            academicDepartment: z.string({required_error: "academicDepartmentId is required"}),
            isDeleted: z.boolean().optional().default(false)
        })
    })
})

const updateFacultyValidationSchema = z.object({
    body: z.object({
        faculty: z.object({
            designation: z.string({invalid_type_error: "Designation must be a string", required_error:"Designation must be required"}).optional(),
            name: updateFacultyUserNameValidationSchema.optional(),
            gender: z.enum([...Gender] as [string, ...string[]]).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
            contactNo: z.string({required_error: "contactNo is required"}).optional(),
            emergencyContactNo: z.string({required_error: "emergencyContactNo is required"}).optional(),
            presentAddress: z.string({required_error: "presentAddress is required"}).optional(),
            permanentAddress: z.string({required_error: "permanentAddress is required"}).optional(),
            profileImg: z.string().optional(),
            academicDepartment: z.string({required_error: "academicDepartmentId is required"}).optional(),
            isDeleted: z.boolean().optional()
        })
    })
})


export const facultyValidations ={
    createFacultyValidationSchema,
    updateFacultyValidationSchema
}