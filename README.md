# 🪑 TAPIPIEL - Sitio Web Corporativo

Sitio web moderno y profesional para **Tapipiel**, empresa líder en tapicería y limpieza de muebles con más de 50 años de experiencia en CDMX y Cuernavaca.

---

## Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación con Docker](#-instalación-con-docker)
- [Comandos Disponibles](#-comandos-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Despliegue](#-despliegue)
- [Información de Contacto](#-información-de-contacto)

---

## Características

- ✅ **100% basado en Docker** - No requiere Node.js instalado localmente
- ✅ **Vite + SCSS** - Build rápido y desarrollo instantáneo con HMR
- ✅ **Arquitectura modular** - Código organizado y mantenible
- ✅ **SEO optimizado** - Meta tags, Schema.org, Open Graph
- ✅ **Responsive design** - Mobile-first, adaptable a todos los dispositivos
- ✅ **Accesibilidad** - ARIA labels, navegación por teclado
- ✅ **Performance** - Lazy loading, code splitting, optimización de assets
- ✅ **Botones flotantes** - WhatsApp y teléfono siempre visibles
- ✅ **Smooth scroll** - Navegación fluida entre secciones

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vite** | 5.0+ | Build tool y dev server |
| **SCSS** | Latest | Preprocesador CSS |
| **Vanilla JavaScript** | ES6+ | Sin frameworks pesados |
| **Docker** | Latest | Contenedorización |
| **Node.js** | 20 LTS | Entorno de ejecución (en Docker) |

---

## Requisitos Previos

### Software necesario:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac/Linux)
- [Git](https://git-scm.com/downloads) (opcional, para clonar el repositorio)

**IMPORTANTE:** No necesitas instalar Node.js, npm ni ninguna otra dependencia en tu máquina. Todo se ejecuta dentro de Docker.

---

## 🐳 Instalación con Docker

### 1️⃣ Clonar el repositorio (o descargar el ZIP)

```powershell
git clone https://github.com/Santiago-Penaranda-Peinado/tapipiel-refactor.git
cd tapipiel-refactor
```

### 2️⃣ Construir y levantar el contenedor de desarrollo

```powershell
docker-compose up dev
```

Este comando:
- Construye la imagen Docker (solo la primera vez)
- Instala las dependencias de Node.js dentro del contenedor
- Levanta el servidor de desarrollo de Vite
- Habilita Hot Module Replacement (recarga automática)

### 3️⃣ Abrir en el navegador

Una vez que veas el mensaje:

```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: http://172.XX.X.X:5173/
```

Abre tu navegador en: **http://localhost:5173**

---

## 🛠️ Comandos Disponibles

### Desarrollo

```powershell
# Levantar servidor de desarrollo
docker-compose up dev

# Levantar en segundo plano (detached mode)
docker-compose up -d dev

# Ver logs en tiempo real
docker-compose logs -f dev

# Detener el servidor
docker-compose down
```

### Producción

```powershell
# Construir para producción
docker-compose build prod

# Levantar servidor de producción (Nginx)
docker-compose up prod

# Acceder en: http://localhost:8080
```

### Utilidades Docker

```powershell
# Ver contenedores corriendo
docker ps

# Acceder al shell del contenedor
docker exec -it tapipiel-dev sh

# Limpiar volúmenes (si hay problemas con node_modules)
docker-compose down -v

# Reconstruir imagen desde cero
docker-compose build --no-cache dev
```

### Comandos NPM dentro del contenedor

```powershell
# Instalar una nueva dependencia
docker exec tapipiel-dev npm install nombre-paquete

# Ejecutar scripts de package.json
docker exec tapipiel-dev npm run build
```

---

##  Estructura del Proyecto

```
tapipiel-refactor/
│
├── index.html                      # Página principal
├──  package.json                    # Dependencias del proyecto
├──  vite.config.js                  # Configuración de Vite
│
├── 🐳 Dockerfile                      # Multi-stage Dockerfile
├── 🐳 docker-compose.yml              # Orquestación de contenedores
├── 🐳 .dockerignore                   # Archivos ignorados por Docker
│
├── 📂 src/
│   ├── 📂 styles/
│   │   ├── 📂 abstracts/
│   │   │   ├── _variables.scss       #  Colores, fuentes, breakpoints
│   │   │   └── _mixins.scss          #  Mixins reutilizables
│   │   ├── 📂 base/
│   │   │   ├── _reset.scss           #  Reset CSS
│   │   │   ├── _typography.scss      #  Estilos de texto
│   │   │   └── _animations.scss      #  Animaciones
│   │   ├── 📂 components/
│   │   │   ├── _buttons.scss         #  Botones
│   │   │   └── _floating-buttons.scss #  Botones flotantes
│   │   └── main.scss                 #  Archivo principal (importa todo)
│   │
│   ├── 📂 scripts/
│   │   ├── 📂 modules/
│   │   │   ├── navigation.js         #  Menú y navegación
│   │   │   ├── smooth-scroll.js      #  Scroll suave
│   │   │   └── scroll-top.js         #  Botón volver arriba
│   │   └── main.js                   #  Entry point JavaScript
│   │
│   └── 📂 assets/
│       ├── 📂 images/                 #  Imágenes del sitio
│       └── 📂 fonts/                  #  Fuentes personalizadas
│
├── 📂 public/                         # Archivos estáticos (favicon, robots.txt)
│
└── 📂 dist/                           #  Build de producción (generado)
```

---

##  Guía de Desarrollo

### Variables SCSS

Todas las variables están centralizadas en `src/styles/abstracts/_variables.scss`:

```scss
// Colores corporativos
$color-primary: #00008b;      // Azul oscuro Tapipiel
$color-secondary: #0570ae;    // Azul claro
$color-accent: #46C254;       // Verde WhatsApp

// Fuentes
$font-primary: 'Raleway', sans-serif;  // Títulos
$font-secondary: 'Lato', sans-serif;    // Texto

// Breakpoints
$breakpoint-sm: 768px;
$breakpoint-md: 1024px;
$breakpoint-lg: 1280px;
```

### Mixins útiles

```scss
// Responsive
@include respond-to(md) { ... }

// Flexbox centrado
@include flex-center;

// Grid automático
@include grid-auto(300px, 1rem);

// Transiciones
@include transition(all, 300ms);
```

### Crear un nuevo componente

1. **Crear el archivo SCSS:**

```powershell
# Crear archivo dentro del contenedor
docker exec tapipiel-dev touch src/styles/components/_card.scss
```

2. **Agregar estilos:**

```scss
// src/styles/components/_card.scss
.card {
  background: $color-bg-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
  padding: $spacing-lg;
  @include transition(all, $transition-base);
  
  &:hover {
    box-shadow: $shadow-xl;
  }
}
```

3. **Importar en main.scss:**

```scss
// src/styles/main.scss
@import 'components/card';
```

### Crear un nuevo módulo JavaScript

1. **Crear el archivo:**

```javascript
// src/scripts/modules/slider.js

export function initSlider() {
  console.log('✅ Slider inicializado');
  // Tu código aquí
}
```

2. **Importar en main.js:**

```javascript
// src/scripts/main.js
import { initSlider } from './modules/slider.js';

function init() {
  initSlider();
}
```

---

##  Información de Contacto de Tapipiel

### Teléfonos
- **CDMX:** [56 3342 1772](tel:+525633421772)
- **Cuernavaca:** [777 986 2576](tel:+527779862576)

### Email
- **Ventas:** ventas@tapipiel.com.mx

### Dirección
```
Priv. Rancho de La Cruz 36
Jamaica, 15800
Ciudad de México
```

### Redes Sociales
- **WhatsApp:** [+52 56 3342 1772](https://wa.me/525633421772)

---

##  Despliegue

### Build para producción

```powershell
# Construir proyecto
docker-compose build prod

# Los archivos optimizados estarán en /dist
```

### Opciones de hosting

El proyecto puede desplegarse en:

- **Netlify** (Recomendado)
- **Vercel**
- **GitHub Pages**
- **Servidor propio con Nginx**

### Ejemplo con Netlify

1. Conectar repositorio de GitHub
2. Configurar build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Deploy automático con cada push

---

##  Notas Importantes

### Hot Reload en Docker

Si los cambios no se reflejan automáticamente:

1. Verificar que el contenedor esté corriendo:
```powershell
docker ps
```

2. Revisar logs:
```powershell
docker-compose logs -f dev
```

3. Reconstruir el contenedor:
```powershell
docker-compose down -v
docker-compose up dev --build
```

### Problemas Comunes

**❌ Error: "Address already in use"**

Otro proceso está usando el puerto 5173:

```powershell
# Windows
netstat -ano | findstr :5173
taskkill /PID <numero_pid> /F

# Cambiar puerto en docker-compose.yml:
ports:
  - "5174:5173"
```

**❌ Error: "Cannot find module"**

Las dependencias no se instalaron correctamente:

```powershell
docker-compose down -v
docker-compose up dev --build
```

---

##  Licencia

Este proyecto es privado y pertenece a **Tapipiel**. Todos los derechos reservados © 2024.

---

##  Desarrollado por

**Santiago Peñaranda Peinado**
- GitHub: [@Santiago-Penaranda-Peinado](https://github.com/Santiago-Penaranda-Peinado)

---

## 🆘 Soporte

Para problemas técnicos o dudas sobre el proyecto, contactar al desarrollador o crear un issue en GitHub.

---

**¡Gracias por usar Tapipiel Website! 🪑**
