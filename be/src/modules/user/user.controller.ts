import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserData, LoginData } from './user.schema';
import { verifyPassword } from "../../utils/hash";
import { fastify } from "../../app";

export async function registerUserHandler(req: FastifyRequest<{ Body: CreateUserData}>, reply: FastifyReply) {
    const body = req.body;
    console.log('registerUserHandler', body);
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "POST");

    try {
        const user = await createUser(body);
        return reply.code(201).send(user);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }

}

export async function loginHandler(req: FastifyRequest<{ Body: LoginData}>, reply: FastifyReply) {
    const body = req.body;

    // find a user by email
    const user = await findUserByEmail(body.email);

    if (!user) {
        return reply.code(401).send({
            message: 'Invalid email',
        });
    }
    // verify password
    const correctPassword = verifyPassword({
        password: body.password,
        salt: user.salt,
        hash: user.password
    });

    if (correctPassword) {
        const { password, salt, ...rest } = user;
        return { token: fastify.jwt.sign(rest)}
    }

    return reply.code(401).send({
        message: 'Invalid password',
    });
    // generate token

    // response
}

export async function getUsersHandler(req: FastifyRequest, reply: FastifyReply) {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    const users = await findUsers();

    return users;
}