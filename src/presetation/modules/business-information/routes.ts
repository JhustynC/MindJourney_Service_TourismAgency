import { Router } from "express";
import { BusinessInformationController } from "./contoller";
import { BusinessInformationService } from "./business-information.service";

/**
 * @swagger
 * /api/business/offers:
 *   post:
 *     summary: Crear una nueva oferta de partner
 *     description: |
 *       Registra una nueva oferta de un partner turístico.
 *       Valida todos los campos incluyendo validación de fechas y precio.
 *       
 *       **Validaciones:**
 *       - ID requerido
 *       - partnerId requerido
 *       - title requerido
 *       - description requerido
 *       - price debe ser >= 0
 *       - validFrom debe ser < validTo
 *       - Ambas fechas deben ser strings ISO 8601
 *     tags:
 *       - Business Information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *           example:
 *             id: "offer-001"
 *             partnerId: "partner-123"
 *             title: "Descuento en tours históricos"
 *             description: "20% descuento en todos nuestros tours"
 *             validFrom: "2026-01-20T00:00:00Z"
 *             validTo: "2026-02-28T23:59:59Z"
 *             price: 49.99
 *     responses:
 *       200:
 *         description: Oferta registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Error de validación (campos faltantes, valores inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missingId:
 *                 value:
 *                   message: "Missing id"
 *               negativPrice:
 *                 value:
 *                   message: "Price cannot be negative"
 *               invalidDates:
 *                 value:
 *                   message: "validFrom must be before validTo"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Internal Server Error"
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