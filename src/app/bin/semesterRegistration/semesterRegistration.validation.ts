import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


const createSemesterRegistrationValidationSchema = z.object({
 body: z.object({
    academicSemester: z.string({required_error:"academicSemester is required"}),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.number(),
    maxCredit: z.number()
 })
})

const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
       academicSemester: z.string({required_error:"academicSemester is required"}).optional(),
       status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]).optional(),
       startDate: z.string().optional(),
       endDate: z.string().optional(),
       minCredit: z.number().optional(),
       maxCredit: z.number().optional()
    })
   })

export const semesterRegistrationValidation = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema
}