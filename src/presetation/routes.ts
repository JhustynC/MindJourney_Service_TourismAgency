import { Router } from 'express';
import { RouteRoutes } from './modules/route/routes';
import { BusinessInformationRoutes } from './modules/business-information/routes';
import { BusinesPartnerRoutes } from './modules/business-partner/routes';
import { MapServiceRoutes } from './modules/map-service/routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/route', RouteRoutes.routes );
    router.use('/api/business', BusinessInformationRoutes.routes );
    router.use('/api/partner', BusinesPartnerRoutes.routes );
    router.use('/api/maps', MapServiceRoutes.routes );
  
    return router;
  }


}

