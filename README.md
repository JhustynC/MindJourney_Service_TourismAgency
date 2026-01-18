# MindJourney Tourism Agency API

API para gestionar rutas turísticas y ofertas de partners.

## ��� Servicio en Vivo

**API Base URL:** `https://mindjourney-service-tourismagency.onrender.com`

**Documentación Interactiva (Swagger):** `https://mindjourney-service-tourismagency.onrender.com/api-docs`

## ��� Requisitos

- Node.js 18+
- npm o yarn

## ��� Instalación Local

```bash
git clone https://github.com/JhustynC/MindJourney_Service_TourismAgency.git
cd MindJourney_Service_TourismAgency
npm install
```

## ��� Configuración Local

1. Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

2. Configura las variables (opcional, usa valores por defecto):

```env
PORT=5000
NODE_ENV=development
```

## ��� Desarrollo Local

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

Documentación: `http://localhost:5000/api-docs`

## ���️ Build para Producción

```bash
npm run build
npm start
```

## ��� Documentación de API

La documentación interactiva Swagger está disponible en:

- **Local**: `http://localhost:5000/api-docs`
- **Producción**: `https://mindjourney-service-tourismagency.onrender.com/api-docs`

En Swagger puedes:
- Ver todos los endpoints
- Ver esquemas de validación
- Probar los endpoints directamente
- Ver códigos de respuesta

## ��� Endpoints Disponibles

### Routes
- `POST /api/route/route-updates` - Crear/actualizar una ruta turística

### Business Information
- `POST /api/business/offers` - Crear una oferta de partner

## ��� Testing

### POST /api/business/offers

Crear una nueva oferta:

```bash
curl -X POST https://mindjourney-service-tourismagency.onrender.com/api/business/offers \
  -H "Content-Type: application/json" \
  -d '{
    "id":"offer-001",
    "partnerId":"partner-123",
    "title":"Descuento en tours históricos",
    "description":"20% descuento en todos nuestros tours",
    "validFrom":"2026-01-20T00:00:00Z",
    "validTo":"2026-02-28T23:59:59Z",
    "price":49.99
  }'
```

**Response exitoso (200):**
```json
{
  "message": "New offer was received successfully\nOfferEntity { ... }"
}
```

---

### POST /api/route/route-updates

Crear/actualizar una ruta con paradas:

```bash
curl -X POST https://mindjourney-service-tourismagency.onrender.com/api/route/route-updates \
  -H "Content-Type: application/json" \
  -d '{
    "id":"route-456",
    "totalDistanceKm":25.5,
    "totalDurationMin":90,
    "polyline":"encoded_polyline_string",
    "stops":[
      {
        "order":1,
        "place":{
          "id":"place-001",
          "name":"Plaza Principal",
          "coordinates":{
            "longitud":-74.0076,
            "latitud":40.7128
          },
          "category":0
        }
      },
      {
        "order":2,
        "place":{
          "id":"place-002",
          "name":"Museo de Arte",
          "coordinates":{
            "longitud":-74.0060,
            "latitud":40.7614
          },
          "category":2
        }
      }
    ]
  }'
```

**Response exitoso (200):**
```json
{
  "message": "New route was received successfully\nRouteEntity { ... }"
}
```

## ��� Validaciones

### OfferEntity
- ✅ ID requerido (o `_id` de MongoDB)
- ✅ partnerId requerido
- ✅ title requerido
- ✅ description requerido
- ✅ price >= 0 (no puede ser negativo)
- ✅ validFrom < validTo (fecha de inicio debe ser anterior al fin)
- ✅ Soporta fechas ISO 8601 (ej: "2026-01-20T00:00:00Z")

### RouteEntity
- ✅ ID requerido
- ✅ totalDistanceKm requerido (número)
- ✅ totalDurationMin requerido (número entero)
- ✅ polyline requerido (string)
- ✅ stops requerido (array no vacío)

### Place
- ✅ ID requerido
- ✅ name requerido
- ✅ coordinates requerido
- ✅ category requerido (0-4)

**PlaceCategory:**
- `0` = CITY (Ciudad)
- `1` = HOTEL (Hotel)
- `2` = ATTRACTION (Atracción)
- `3` = RESTAURANT (Restaurante)
- `4` = ACTIVITY (Actividad)

### Coordinates
- ✅ longitud requerido (número)
- ✅ latitud requerido (número)

## ��� Estructura del Proyecto

```
src/
├── app.ts                    # Punto de entrada
├── domain/
│   ├── entities/             # Clases de dominio
│   │   ├── offer.entity.ts
│   │   ├── route.entity.ts
│   │   ├── route-stop.entity.ts
│   │   ├── place.entity.ts
│   │   └── coordinates.entity.ts
│   └── errors/
│       └── custom.errors.ts  # Manejo de errores
└── presetation/
    ├── modules/              # Módulos de negocio
    │   ├── business-information/
    │   │   ├── routes.ts
    │   │   ├── controller.ts
    │   │   └── business-information.service.ts
    │   └── route/
    │       ├── routes.ts
    │       ├── controller.ts
    │       └── routes.service.ts
    ├── routes.ts             # Rutas principales
    ├── server.ts             # Configuración del servidor
    └── swagger.ts            # Configuración de Swagger
```

## ��� Deploy en Render

### Estado Actual
✅ **API Desplegada y funcionando en:**
- **URL:** `https://mindjourney-service-tourismagency.onrender.com`
- **Swagger:** `https://mindjourney-service-tourismagency.onrender.com/api-docs`

### Configuración
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Node.js Version:** 20.11.0

### Para Re-deployar

1. Haz cambios en local
2. Commit y push a GitHub:
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

3. Render redeploy automáticamente

## ��� Flujo de Validación

```
JSON Input
  ↓
Controller.method(req)
  ↓
Entity.fromObject(json)
  ├─ Valida campos
  ├─ Transforma objetos anidados
  └─ Retorna [Error?, Entity?]
  ↓
if (Error) handleError() → Response 400
  ↓
Service.method(entity)
  ↓
Response 200/500
```

## ��� Licencia

ISC
