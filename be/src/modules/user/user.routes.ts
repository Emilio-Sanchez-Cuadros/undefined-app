import { FastifyInstance } from "fastify";
import { registerUserHandler, updateUserHandler, deleteUserHandler, loginHandler, getUsersHandler } from './user.controller'
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {

    // Create user
    server.post('/', {
        schema: {
            body: $ref("createUserSchema"),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, registerUserHandler);

    // Log in with already created user
    server.post('/login', {
        schema: {
            body: $ref("loginSchema"),
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler);

    // Update user
    server.put('/:id', {
        schema: {
            body: $ref("updateUserSchema"),
            response: {
                200: $ref('updateUserResponseSchema')
            }
        }
    }, updateUserHandler);

    // Delete user
    server.delete('/:id', {
    }, deleteUserHandler);

    // Get users list
    server.get('/', {
        preHandler: server.authenticate
    }, getUsersHandler);
    
}

export default userRoutes;