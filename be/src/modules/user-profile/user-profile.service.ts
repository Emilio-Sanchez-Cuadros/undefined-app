import prisma from '../../utils/prisma';
import { CreateUserProfileData } from './user-profile.schema';

export async function createUserProfile(data: CreateUserProfileData & {ownerId: number}) {
    const userProfile = await prisma.userProfile.create({
        data,
    });

    return userProfile;
}

export async function getUserProfile(id: number) {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}