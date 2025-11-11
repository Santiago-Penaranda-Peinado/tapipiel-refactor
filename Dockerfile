# ============================================
# DOCKERFILE PARA TAPIPIEL - VITE + SCSS
# ============================================
# Este Dockerfile configura un entorno de desarrollo
# Node.js para ejecutar Vite sin necesidad de instalar
# Node localmente en la máquina del desarrollador
# ============================================

# Etapa 1: Imagen base de Node.js LTS (Long Term Support)
FROM node:20-alpine AS base

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar dependencias del sistema necesarias para Vite y SCSS
# - git: para control de versiones
# - python3, make, g++: para compilar módulos nativos de Node
RUN apk add --no-cache git python3 make g++

# ============================================
# Etapa 2: DESARROLLO
# ============================================
FROM base AS development

# Copiar archivos de configuración de dependencias
# El asterisco (*) hace que package-lock.json sea opcional
COPY package.json package-lock.json* ./

# Instalar todas las dependencias (incluyendo devDependencies)
# Si no existe package-lock.json, npm lo generará automáticamente
RUN npm install

# Exponer puerto 5173 (puerto por defecto de Vite)
EXPOSE 5173

# Comando por defecto: iniciar servidor de desarrollo
# --host: permite acceso desde fuera del contenedor
# --port: puerto específico
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ============================================
# Etapa 3: BUILD (Construcción de producción)
# ============================================
FROM base AS builder

# Copiar archivos de configuración
COPY package.json package-lock.json* ./

# Instalar todas las dependencias (necesarias para el build)
RUN npm install

# Copiar todo el código fuente
COPY . .

# Ejecutar el build de producción
# Esto genera archivos optimizados en /app/dist
RUN npm run build

# ============================================
# Etapa 4: PRODUCCIÓN (Servidor web liviano)
# ============================================
FROM nginx:alpine AS production

# Copiar archivos compilados desde la etapa builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto 80 (HTTP estándar)
EXPOSE 80

# Comando por defecto: iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
