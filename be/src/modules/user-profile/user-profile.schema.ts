import {z} from 'zod';
import { buildJsonSchemas } from 'fastify-zod'

const userProfileData = {
    profileImage: z.string(),
    role: z.string(),
    ownerId: z.number()
};

const createUserProfileSchema = z.object({
    ...userProfileData
});

const userProfileResponseSchema = z.object({
    ...userProfileData
});

export type CreateUserProfileData = z.infer<typeof createUserProfileSchema>;

export const {schemas: userProfileSchemas, $ref } = buildJsonSchemas({
    createUserProfileSchema,
    userProfileResponseSchema
}, { $id: "userProfileSchema" })