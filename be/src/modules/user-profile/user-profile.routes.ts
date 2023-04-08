import { FastifyInstance } from "fastify";
import { createUserProfileHandler, getUserProfileHandler } from './user-profile.controller'
import { $ref } from "./user-profile.schema";

async function userProfileRoutes(server: FastifyInstance) {

    server.post('/',
    {
        preHandler: server.authenticate,
        schema: {
            body: $ref("createUserProfileSchema"),
            response: {
                201: $ref('userProfileResponseSchema')
            }
        }
    }, createUserProfileHandler);

    server.get('/:id', {
        preHandler: server.authenticate
    }, getUserProfileHandler);
    
}

export default userProfileRoutes;