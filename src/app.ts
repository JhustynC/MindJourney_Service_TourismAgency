import { AppRoutes } from './presetation/routes';
import { Server } from './presetation/server';

(async()=> {
  main();
})();


async function main() {
//   console.table(envs);

  const server = new Server({
    port: 5000,
    routes: AppRoutes.routes,
  });

  server.start();
}