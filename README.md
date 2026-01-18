# MindJourney Tourism Agency API

API para gestionar rutas turísticas y ofertas de partners.

## 🚀 Requisitos

- Node.js 18+
- npm o yarn

## 📦 Instalación

```bash
npm install
```

## 🔧 Configuración Local

1. Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

2. Configura las variables (opcional, usa valores por defecto):

```env
PORT=5000
NODE_ENV=development
```

## 💻 Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## 📚 Documentación de API

La documentación interactiva está disponible en:
- **Local**: `http://localhost:5000/api-docs`
- **Producción (Render)**: `https://tu-app.onrender.com/api-docs`

## 🏗️ Build para Producción

```bash
npm run build
npm start
```

## 🌐 Deploy en Render

### Paso 1: Conectar repositorio

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Conecta tu repositorio de GitHub
3. Crea un nuevo "Web Service"

### Paso 2: Configurar el servicio

- **Name**: `mindjourney-tourism-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Region**: Elige la más cercana

### Paso 3: Variables de entorno

En Render, ve a **Environment** y agrega:

```
PORT=10000
NODE_ENV=production
```

### Paso 4: Deploy

El deploy se iniciará automáticamente. El URL será:
```
https://mindjourney-tourism-api.onrender.com
```

## 📋 Endpoints

### Routes
- `POST /api/route/route-updates` - Crear/actualizar ruta

### Business Information
- `POST /api/business/offers` - Crear oferta de partner

## 🧪 Testing

Ejemplos de requests:

### POST /api/business/offers
```bash
curl -X POST http://localhost:5000/api/business/offers \
  -H "Content-Type: application/json" \
  -d '{
    "id":"offer-001",
    "partnerId":"partner-123",
    "title":"Descuento",
    "description":"20%",
    "validFrom":"2026-01-20T00:00:00Z",
    "validTo":"2026-02-28T23:59:59Z",
    "price":49.99
  }'
```

### POST /api/route/route-updates
```bash
curl -X POST http://localhost:5000/api/route/route-updates \
  -H "Content-Type: application/json" \
  -d '{
    "id":"route-456",
    "totalDistanceKm":25.5,
    "totalDurationMin":90,
    "polyline":"encoded",
    "stops":[{
      "order":1,
      "place":{
        "id":"p1",
        "name":"Plaza",
        "coordinates":{"longitud":-74.0076,"latitud":40.7128},
        "category":0
      }
    }]
  }'
```

## 📝 Estructura del Proyecto

```
src/
├── app.ts              # Punto de entrada
├── domain/
│   ├── entities/       # Clases de dominio
│   └── errors/         # Manejo de errores
└── presetation/
    ├── modules/        # Módulos de negocio
    ├── routes.ts       # Rutas principales
    ├── server.ts       # Configuración del servidor
    └── swagger.ts      # Configuración de Swagger
```

## 🔒 Validaciones

### OfferEntity
- ID requerido
- partnerId requerido
- title requerido
- description requerido
- price >= 0
- validFrom < validTo

### RouteEntity
- ID requerido
- totalDistanceKm requerido
- totalDurationMin requerido
- polyline requerido
- stops (array no vacío) requerido

### Place
- ID requerido
- name requerido
- coordinates requerido
- category (0-4) requerido

### Coordinates
- longitud requerido
- latitud requerido

## 📄 Licencia

ISC
