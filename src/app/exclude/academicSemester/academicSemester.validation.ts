import {z} from "zod"
import { academicSemesterCodes, academicSemesterNames, months } from "./academicSemester.constant";



const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...academicSemesterNames] as [string, ...string[]]),
        code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...months] as [string, ...string[]]),
        endMonth: z.enum([...months] as [string, ...string[]]),
        isDeleted: z.boolean().optional().default(false)
    })
})

const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...academicSemesterNames] as [string, ...string[]]).optional(),
        code: z.enum([...academicSemesterCodes] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...months] as [string, ...string[]]).optional(),
        isDeleted: z.boolean().optional().default(false)
    })
})

export const academicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}