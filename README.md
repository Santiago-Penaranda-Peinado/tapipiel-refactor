# 🪑 TAPIPIEL - Sitio Web Corporativo

Sitio web moderno y profesional para **Tapipiel**, empresa líder en tapicería y limpieza de muebles con más de 50 años de experiencia en CDMX y Cuernavaca.

## 🎯 Estado del Proyecto: ✅ COMPLETADO

**Versión:** 1.0.0  
**Última actualización:** Noviembre 13, 2025

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación con Docker](#-instalación-con-docker)
- [Comandos Disponibles](#-comandos-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [SEO y Optimización](#-seo-y-optimización)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Despliegue](#-despliegue)
- [Verificación Post-Deployment](#-verificación-post-deployment)
- [Solución de Problemas](#-solución-de-problemas)
- [Información de Contacto](#-información-de-contacto)

---

## ✨ Características

### Funcionalidades Principales
- ✅ **Navegación responsive** - Menú adaptable con hamburger menu en móvil
- ✅ **Hero slider** - 4 slides automáticos con controles
- ✅ **Estadísticas animadas** - Contadores en sección "Nosotros"
- ✅ **3 Categorías de servicios** - Residencial, Oficina, Restauración
- ✅ **Proceso de limpieza** - 6 pasos detallados
- ✅ **Materiales premium** - Catálogo de materiales
- ✅ **Formulario de contacto** - Con Google reCAPTCHA
- ✅ **Botones flotantes** - WhatsApp y teléfono siempre visibles
- ✅ **Smooth scroll** - Navegación fluida entre secciones
- ✅ **Preloader animado** - Carga inicial elegante
- ✅ **Popup del Buen Fin** - Promoción especial con scroll al formulario
### Tecnología y Performance
- ✅ **100% basado en Docker** - No requiere Node.js instalado localmente
- ✅ **Vite + SCSS** - Build rápido (8.45s) y desarrollo instantáneo con HMR
- ✅ **Arquitectura modular** - Código organizado y mantenible
- ✅ **SEO completo** - Meta tags, Schema.org, Open Graph, Twitter Cards, robots.txt, sitemap.xml
- ✅ **Responsive design** - Mobile-first, adaptable a todos los dispositivos
- ✅ **Accesibilidad** - ARIA labels, navegación por teclado, roles semánticos
- ✅ **Performance optimizado** - Minificación, code splitting, cache busting, gzip ready
- ✅ **Build optimizado** - HTML 9.89KB, CSS 11.15KB, JS 3.72KB (gzipped)

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

---

## 🎉 Popup del Buen Fin

### Características
- **Colores oficiales:** Rojo profundo (#540000) y dorado (#FFD700)
- **Promoción destacada:** "12 MESES SIN INTERESES"
- **Timing:** Aparece a los 2 segundos de cargar
- **Frecuencia:** Se muestra solo 1 vez por sesión
- **CTA:** Scroll suave al formulario de contacto
- **Responsive:** Adaptado a móvil, tablet y desktop
- **Accesible:** ARIA labels, cierre con ESC, click fuera

### Archivos
- `src/scripts/modules/popup-promo.js` - Lógica del popup
- `src/styles/components/_popup-promo.scss` - Estilos Buen Fin

### Controles para Testing
```javascript
// Forzar mostrar popup
localStorage.setItem('buenFinPopupOn', '1')

// Forzar ocultar popup
localStorage.setItem('buenFinPopupOff', '1')

// Limpiar sesión (volver a mostrar)
sessionStorage.removeItem('buenFinPopupShown')
```

### Configuración de Fechas (Opcional)
Para limitar el popup a fechas específicas del Buen Fin, edita `src/scripts/modules/popup-promo.js`:

```javascript
// Ejemplo: Limitar del 15 al 18 de noviembre
const START_DATE = new Date('2025-11-15T00:00:00-06:00');
const END_DATE = new Date('2025-11-18T23:59:59-06:00');
```

---

## 🔍 SEO y Optimización

### Meta Tags Implementados
- ✅ Title optimizado con keywords (75 caracteres)
- ✅ Meta description atractiva (155 caracteres)
- ✅ Keywords relevantes para la industria
- ✅ Canonical URL
- ✅ Theme color (#00008b)
- ✅ Robots: index, follow

### Open Graph (Facebook/LinkedIn)
- ✅ og:type, og:url, og:title, og:description
- ✅ og:image para compartir en redes
- ✅ og:locale (es_MX)
- ✅ og:site_name

### Twitter Cards
- ✅ twitter:card (summary_large_image)
- ✅ twitter:title, twitter:description, twitter:image

### Structured Data (JSON-LD)
- ✅ Schema.org LocalBusiness completo
- ✅ 2 ubicaciones (CDMX y Cuernavaca)
- ✅ Horarios de atención
- ✅ Catálogo de 4 servicios
- ✅ Coordenadas geográficas
- ✅ Links a redes sociales

### Archivos SEO
- ✅ `public/robots.txt` - Instrucciones para crawlers
- ✅ `public/sitemap.xml` - 8 URLs con prioridades

### Herramientas de Validación
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Schema Validator:** https://validator.schema.org/

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

### 📦 Preparar Build de Producción

```powershell
# Con Docker (recomendado)
docker-compose exec dev npm run build

# Sin Docker
npm run build
```

**Resultado:** Archivos optimizados en `dist/` (HTML 9.89KB, CSS 11.15KB, JS 3.72KB gzipped)

### Opciones de Deployment

#### Opción 1: Hosting Tradicional (cPanel/FTP)

```powershell
# 1. Crear ZIP
Compress-Archive -Path "dist\*" -DestinationPath "tapipiel-produccion.zip" -Force

# 2. Subir a cPanel
# - File Manager → public_html/
# - Upload ZIP → Extract
# - Configurar .htaccess (ver sección siguiente)
```

**Configurar .htaccess (Recomendado):**
```apache
# Habilitar compresión Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache de archivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Headers de seguridad
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Forzar HTTPS (recomendado)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### Opción 2: Netlify (Rápido y Gratis)

```powershell
# Instalar CLI
npm install -g netlify-cli

# Deploy a producción
netlify deploy --prod --dir=dist
```

#### Opción 3: Vercel

```powershell
# Instalar CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Configuración del Formulario

**Requisitos del servidor:**
- PHP 7.4+
- Extensión `mail` o SMTP habilitado
- PHPMailer (ya incluido en `public/phpmailer/`)

**Verificar email destino en `public/envio.php`:**
```php
$para = "ventas@tapipiel.com.mx";
```

**Google reCAPTCHA:** Verificar dominio autorizado en https://www.google.com/recaptcha/admin

---

## ✅ Verificación Post-Deployment

### Funcionalidad Básica
- [ ] Página principal carga correctamente
- [ ] Navegación funciona (desktop + móvil)
- [ ] Hero slider se mueve automáticamente
- [ ] Estadísticas se animan al hacer scroll
- [ ] Formulario envía emails
- [ ] Teléfonos y WhatsApp son clickeables
- [ ] Botones flotantes funcionan

### Popup del Buen Fin
- [ ] Aparece a los 2 segundos
- [ ] Colores correctos (rojo/dorado)
- [ ] Texto: "12 MESES SIN INTERESES"
- [ ] Botón lleva a #contacto
- [ ] Se cierra correctamente
- [ ] No aparece de nuevo en la sesión

### SEO
- [ ] `robots.txt` accesible: `https://tudominio.com/robots.txt`
- [ ] `sitemap.xml` accesible: `https://tudominio.com/sitemap.xml`
- [ ] Title tag en pestaña del navegador
- [ ] Meta description en resultados de búsqueda
- [ ] Open Graph: Probar en Facebook Debugger
- [ ] Twitter Cards: Probar en Twitter Validator

### Performance
- [ ] Página carga < 3 segundos
- [ ] Responsive en móvil, tablet, desktop
- [ ] Imágenes optimizadas
- [ ] Sin errores en consola

---

## 🐛 Solución de Problemas

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

### El popup no aparece
1. Abre consola (F12) y verifica errores
2. Limpia sessionStorage: `sessionStorage.clear()`
3. Recarga: Ctrl + Shift + R

### Imágenes no cargan en producción
- Verifica que estén en `dist/assets/`
- Comprueba rutas (sin `/src/`)
- Revisa permisos: 644 archivos, 755 carpetas

### Formulario no envía
1. Verifica `envio.php` está en la raíz
2. PHP habilitado en servidor
3. Revisa logs del servidor
4. Verifica reCAPTCHA en Google Console

### Error: "Address already in use"
```powershell
# Windows
netstat -ano | findstr :5173
taskkill /PID <numero_pid> /F
```

### Warnings de SASS en build
Los warnings de deprecación (`@import`, división `/`) son normales y **no afectan** el funcionamiento. Pueden ignorarse.

---

## 📚 Documentación Adicional

Para información detallada sobre compilación y optimizaciones, consulta:
- **[BUILD.md](BUILD.md)** - Guía completa de compilación

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
