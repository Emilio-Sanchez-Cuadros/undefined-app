import prisma from '../../utils/prisma';
import { CreateUserData } from './user.schema';
import { encryptPassword } from '../../utils/hash';

export async function createUser(params: CreateUserData) {
    const { password, ...rest } = params;
    const { hash, salt } = encryptPassword(password);
    const user = await prisma.user.create({
        data: {...rest, salt, password: hash},
    });

    return user;
}