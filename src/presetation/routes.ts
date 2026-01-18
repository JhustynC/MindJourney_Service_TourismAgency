import { Router } from 'express';
import { RouteRoutes } from './modules/route/routes';
import { BusinessInformationRoutes } from './modules/business-information/routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/route', RouteRoutes.routes );
    router.use('/api/business', BusinessInformationRoutes.routes );
  
    return router;
  }


}

