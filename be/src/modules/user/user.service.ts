import prisma from '../../utils/prisma';
import { CreateUserData, UpdateUserData } from './user.schema';
import { encryptPassword } from '../../utils/hash';

export async function createUser(params: CreateUserData) {
    const { password, ...rest } = params;
    const { hash, salt } = encryptPassword(password);
    const user = await prisma.user.create({
        data: {...rest, salt, password: hash},
    });

    return user;
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

export async function updateUser(params: UpdateUserData, id: number) {
    const { password, ...rest } = params;
    const { hash, salt } = encryptPassword(password);
    return prisma.user.update({
        where: { id: Number(id) },
        data: { ...rest, salt, password: hash }
    })
}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    });
}