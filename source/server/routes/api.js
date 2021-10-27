import App from '../App.js';

async function routes(fastify, options) {
  fastify.get('/api/test', async (request, reply) => {
    reply
      .type('application/json')
      .send({
        success: true,
        timestamp: Date.now()
      });
  });
}

export default routes;