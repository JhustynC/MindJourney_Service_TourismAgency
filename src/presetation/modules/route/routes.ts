import { Router } from "express";
import { RouteController } from "./controller";
import { RouteService } from "./routes.service";

/**
 * @swagger
 * /api/route/route-updates:
 *   post:
 *     summary: Actualizar una ruta turística
 *     description: Crea o actualiza una ruta con sus paradas y lugares
 *     tags:
 *       - Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: Ruta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

export class RouteRoutes {
    static get routes(): Router {
        const router = Router();
        const service = new RouteService();
        const controller = new RouteController(service);

        router.post('/route-updates', controller.updateRoute);

        return router;
    }
}