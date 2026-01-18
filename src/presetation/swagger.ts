import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MindJourney Tourism Agency API',
      version: '1.0.0',
      description: 'API para gestionar rutas turísticas y ofertas de partners. Servicio completamente documentado con validaciones robustas.',
      contact: {
        name: 'API Support',
        email: 'support@mindjourney.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://mindjourney-service-tourismagency.onrender.com',
        description: 'Servidor de producción (Render)',
      },
    ],
    components: {
      schemas: {
        Coordinates: {
          type: 'object',
          required: ['longitud', 'latitud'],
          properties: {
            longitud: {
              type: 'number',
              example: -74.0076,
              description: 'Coordenada de longitud',
            },
            latitud: {
              type: 'number',
              example: 40.7128,
              description: 'Coordenada de latitud',
            },
          },
        },
        Place: {
          type: 'object',
          required: ['id', 'name', 'coordinates', 'category'],
          properties: {
            id: {
              type: 'string',
              example: 'place-001',
              description: 'ID único del lugar',
            },
            name: {
              type: 'string',
              example: 'Plaza Principal',
              description: 'Nombre del lugar',
            },
            coordinates: {
              $ref: '#/components/schemas/Coordinates',
              description: 'Coordenadas geográficas del lugar',
            },
            category: {
              type: 'integer',
              enum: [0, 1, 2, 3, 4],
              description: '0=CITY, 1=HOTEL, 2=ATTRACTION, 3=RESTAURANT, 4=ACTIVITY',
              example: 0,
            },
          },
        },
        RouteStop: {
          type: 'object',
          required: ['order', 'place'],
          properties: {
            order: {
              type: 'integer',
              example: 1,
              description: 'Número de orden de la parada en la ruta',
            },
            place: {
              $ref: '#/components/schemas/Place',
              description: 'Información del lugar de la parada',
            },
          },
        },
        Route: {
          type: 'object',
          required: ['id', 'totalDistanceKm', 'totalDurationMin', 'polyline', 'stops'],
          properties: {
            id: {
              type: 'string',
              example: 'route-456',
              description: 'ID único de la ruta',
            },
            totalDistanceKm: {
              type: 'number',
              example: 25.5,
              description: 'Distancia total de la ruta en kilómetros',
            },
            totalDurationMin: {
              type: 'integer',
              example: 90,
              description: 'Duración total estimada en minutos',
            },
            polyline: {
              type: 'string',
              example: 'gfo}EtohhU_@fA',
              description: 'Polyline codificado de Google Maps',
            },
            stops: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/RouteStop',
              },
              description: 'Array de paradas en la ruta (debe tener al menos 1)',
            },
          },
        },
        Offer: {
          type: 'object',
          required: ['id', 'partnerId', 'title', 'description', 'validFrom', 'validTo', 'price'],
          properties: {
            id: {
              type: 'string',
              example: 'offer-001',
              description: 'ID único de la oferta',
            },
            partnerId: {
              type: 'string',
              example: 'partner-123',
              description: 'ID del partner que ofrece',
            },
            title: {
              type: 'string',
              example: 'Descuento en tours históricos',
              description: 'Título de la oferta',
            },
            description: {
              type: 'string',
              example: '20% descuento en todos nuestros tours',
              description: 'Descripción de la oferta',
            },
            validFrom: {
              type: 'string',
              format: 'date-time',
              example: '2026-01-20T00:00:00Z',
              description: 'Fecha de inicio de validez (ISO 8601)',
            },
            validTo: {
              type: 'string',
              format: 'date-time',
              example: '2026-02-28T23:59:59Z',
              description: 'Fecha de fin de validez (ISO 8601)',
            },
            price: {
              type: 'number',
              example: 49.99,
              description: 'Precio de la oferta (debe ser >= 0)',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Missing id',
              description: 'Mensaje de error',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de éxito con información de la entidad',
            },
          },
        },
      },
    },
  },
  apis: ['./src/presetation/modules/**/routes.ts'],
};

export const specs = swaggerJsdoc(options);
