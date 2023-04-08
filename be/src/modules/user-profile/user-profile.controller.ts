import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserProfileData } from "./user-profile.schema";
import { createUserProfile, getUserProfile } from "./user-profile.service";

export async function createUserProfileHandler(req: FastifyRequest<{
    Body: CreateUserProfileData
}>) {
    const userProfile = await createUserProfile({
        ...req.body,
        ownerId: req.body.ownerId
    })

    return userProfile;
}

export async function getUserProfileHandler(req: FastifyRequest) {
    console.log('getUserProfileHandler', req.params);
    const userProfile = await getUserProfile(req.id);

    return userProfile;
}