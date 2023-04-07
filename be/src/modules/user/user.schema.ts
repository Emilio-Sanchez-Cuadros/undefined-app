import {z} from 'zod'

const createUserSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email has to be a string'
    }).email(),
    name: z.string(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password has to be a string'
    })
});

export type CreateUserData = z.infer<typeof createUserSchema>;