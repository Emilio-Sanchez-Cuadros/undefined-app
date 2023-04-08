import Fastify, { FastifyReply, FastifyRequest } from "fastify";
export const fastify = Fastify({ logger: true });
import { userSchemas } from "./modules/user/user.schema";
import { userProfileSchemas } from "./modules/user-profile/user-profile.schema";
import userRoutes from "./modules/user/user.routes";
import userProfileRoutes from "./modules/user-profile/user-profile.routes";
import fjwt from "@fastify/jwt";

// TODO. Check why this is not working properly
declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            email: string;
            id: number;
            name: string;
        };
    }
}

fastify.get('/servercheck', async function () {
    return { status: "Ok" };
});

fastify.register(fjwt, {
    secret: 'very_secret'
});

fastify.decorate('auth', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        await req.jwtVerify();
    } catch (err) {
        return reply.send(err);
    }
})

const start = async () => {

    for (const schema of [...userSchemas, ...userProfileSchemas]) {
        fastify.addSchema(schema);
    }

    fastify.register(userRoutes, { prefix: 'api/users'});
    fastify.register(userProfileRoutes, { prefix: 'api/users/user-profile'});

    try {
      await fastify.listen({ port: 3000, host: '0.0.0.0'  })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  start()