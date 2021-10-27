import fs from 'fs';

async function routes(fastify, options) {
  fastify.get('/*', async (request, reply) => {
    const mainDocument = fs.readFileSync('./assets/documents/main.html', 'utf-8');
    
    reply
      .type('text/html')
      .send(mainDocument);
  });
}

export default routes;