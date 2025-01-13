import {z} from 'zod'
import { BloodGroup, Genders } from './admin.constant'



const createAdminUserNameValidationSchema = z.object({
    firstName: z.string({required_error: "First name is requires"}),
    middleName: z.string().optional(),
    lastName: z.string({required_error: "Last name is required"})
})

const createAdminValidationSchema = z.object({
    body: z.object({
        admin: z.object({
            designation: z.string({required_error: "Designation is required"}),
            name: createAdminUserNameValidationSchema,
            gender: z.enum([...Genders] as [string, ...string[]]),
            dateOfBirth: z.string({required_error: "Date of Birth is required"}),
            email: z.string({required_error: "Email is required"}).email(),
            contactNo: z.string({required_error: "Contact No is required"}),
            emergencyContactNo: z.string({required_error: "Emergency Contact No is required"}),
            bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
            presentAddress: z.string({required_error: "Present Address is required"}),
            permanentAddress: z.string({required_error: "Permanent Address is required"}),
            profileImg: z.string().optional(),
            isDeleted: z.boolean().optional().default(false)
        })
    })
})

export const adminValidationSchema = {
    createAdminValidationSchema
}
