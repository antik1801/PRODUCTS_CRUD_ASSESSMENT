import {z} from 'zod'


const userValidationSchema = z.object({
    Password: z.string().max(20).min(3).optional(),
})


export const userValidation = {
    userValidationSchema
}