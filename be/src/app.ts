import Fastify from "fastify";
const fastify = Fastify({
    logger: true
  })

import userRoutes from "./modules/user/user.routes";

// const server = Fastify();

fastify.get('/servercheck', async function () {
    return { status: "Ok" };
});

const start = async () => {

    fastify.register(userRoutes, { prefix: 'api/users'});

    try {
      await fastify.listen({ port: 3000, host: '0.0.0.0'  })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  start()