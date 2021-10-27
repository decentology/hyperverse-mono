import path from 'path';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import routes from './source/server/routes';

import App from './source/server/App.js';

(async () => {
  const server = fastify({
    logger: false,
    trustProxy: true
  });

  const moduleURL = new URL(import.meta.url);

  server.register(fastifyStatic, {
    root: path.join(path.dirname(moduleURL.pathname), 'assets'),
    prefix: '/assets/'
  });

  server.register(routes.api);
  server.register(routes.client);

  try {
    // await App.main.initialize();
    await server.listen(3500, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
})();