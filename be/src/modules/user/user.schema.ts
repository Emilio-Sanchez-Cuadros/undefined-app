import {z} from 'zod';
import { buildJsonSchemas } from 'fastify-zod'

const userCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email has to be a string'
    }).email(),
    name: z.string()
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        invalid_type_error: 'Password has to be a string'
    })
});

const updateUserSchema = z.object({
    ...userCore,
    password: z.string({
        invalid_type_error: 'Password has to be a string'
    })
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore
});

const updateUserResponseSchema = z.object({
    id: z.number(),
    ...userCore
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email has to be a string'
    }).email(),
    password: z.string()
});

const loginResponseSchema = z.object({
    token: z.string()
});

export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export const {schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    updateUserSchema,
    createUserResponseSchema,
    updateUserResponseSchema,
    loginSchema,
    loginResponseSchema
}, { $id: "userSchema" })