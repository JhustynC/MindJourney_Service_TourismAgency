import { Router } from "express";
import { RouteController } from "./controller";
import { RouteService } from "./routes.service";

/**
 * @swagger
 * /api/route/route-updates:
 *   post:
 *     summary: Crear o actualizar una ruta turística
 *     description: |
 *       Crea o actualiza una ruta completa con sus paradas y lugares.
 *       Valida todos los campos y transforma objetos anidados automáticamente.
 *       
 *       **Validaciones:**
 *       - ID requerido
 *       - totalDistanceKm debe ser número
 *       - totalDurationMin debe ser número entero
 *       - polyline requerido
 *       - stops debe ser array con al menos 1 elemento
 *       - Cada stop debe tener order y place
 *       - Cada place debe tener id, name, coordinates y category (0-4)
 *     tags:
 *       - Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *           example:
 *             id: "route-456"
 *             totalDistanceKm: 25.5
 *             totalDurationMin: 90
 *             polyline: "gfo}EtohhU_@fA"
 *             stops:
 *               - order: 1
 *                 place:
 *                   id: "place-001"
 *                   name: "Plaza Principal"
 *                   coordinates:
 *                     longitud: -74.0076
 *                     latitud: 40.7128
 *                   category: 0
 *     responses:
 *       200:
 *         description: Ruta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Error de validación (campos faltantes, formato incorrecto)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Missing totalDistanceKm"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Internal Server Error"
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