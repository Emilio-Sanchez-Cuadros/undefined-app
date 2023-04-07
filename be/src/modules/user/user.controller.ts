import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";
import { CreateUserData } from './user.schema';

export async function registerUserHandler(req: FastifyRequest<{ Body: CreateUserData}>, reply: FastifyReply) {

    const body = req.body;

    try {
        const user = await createUser(body);
        return reply.code(201).send(user);
    } catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }

}