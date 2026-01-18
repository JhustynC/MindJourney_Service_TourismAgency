import { Router } from "express";
import { BusinessInformationController } from "./contoller";
import { BusinessInformationService } from "./business-information.service";

/**
 * @swagger
 * /api/business/offers:
 *   post:
 *     summary: Crear una nueva oferta de partner
 *     description: Registra una nueva oferta de un partner turístico con validación de fechas y precio
 *     tags:
 *       - Business Information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *     responses:
 *       200:
 *         description: Oferta registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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

export class BusinessInformationRoutes{
    static get routes(): Router {
        const router = Router();
        const service = new BusinessInformationService();
        const controller = new BusinessInformationController(service);

        router.post('/offers', controller.pushPartnerOffers)

        return router;
    }
}