import { AppRoutes } from './presetation/routes';
import { Server } from './presetation/server';
import 'dotenv/config';

(async()=> {
  main();
})();


async function main() {
  const port = parseInt(process.env.PORT || '5000');

  const server = new Server({
    port: port,
    routes: AppRoutes.routes,
  });

  server.start();
}