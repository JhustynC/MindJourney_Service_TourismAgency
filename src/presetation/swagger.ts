import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MindJourney Tourism Agency API',
      version: '1.0.0',
      description: 'API para gestionar rutas turísticas y ofertas de partners',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
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
            },
            latitud: {
              type: 'number',
              example: 40.7128,
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
            },
            name: {
              type: 'string',
              example: 'Plaza Principal',
            },
            coordinates: {
              $ref: '#/components/schemas/Coordinates',
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
            },
            place: {
              $ref: '#/components/schemas/Place',
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
            },
            totalDistanceKm: {
              type: 'number',
              example: 25.5,
            },
            totalDurationMin: {
              type: 'integer',
              example: 90,
            },
            polyline: {
              type: 'string',
              example: 'encoded_polyline_string_here',
            },
            stops: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/RouteStop',
              },
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
            },
            partnerId: {
              type: 'string',
              example: 'partner-123',
            },
            title: {
              type: 'string',
              example: 'Descuento en tours históricos',
            },
            description: {
              type: 'string',
              example: '20% descuento en todos nuestros tours',
            },
            validFrom: {
              type: 'string',
              format: 'date-time',
              example: '2026-01-20T00:00:00Z',
            },
            validTo: {
              type: 'string',
              format: 'date-time',
              example: '2026-02-28T23:59:59Z',
            },
            price: {
              type: 'number',
              example: 49.99,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: ['./src/presetation/modules/**/routes.ts'],
};

export const specs = swaggerJsdoc(options);
