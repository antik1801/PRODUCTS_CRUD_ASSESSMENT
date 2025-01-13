import {z} from "zod"

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error: "Name must be string"}),
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must be an ObjectID",
            required_error: "academicFaculty(string,objectID) property is required",
        }),
        isDeleted: z.boolean().default(false)
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error: "Name must be string"}).optional(),
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must be an ObjectID",
            required_error: "academicFaculty(string,objectID) property is required",
        }).optional(),
    })
})

export const academicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}