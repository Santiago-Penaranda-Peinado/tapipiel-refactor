# 🏗️ Guía de Compilación - Tapipiel Website

## 📋 Requisitos Previos

- Docker y Docker Compose instalados
- O Node.js v18+ y npm instalados localmente

## 🚀 Compilar el Proyecto

### Opción 1: Con Docker (Recomendado)

```powershell
# Asegúrate de que el contenedor esté corriendo
docker-compose up -d dev

# Compila el proyecto
docker-compose exec dev npm run build
```

### Opción 2: Sin Docker (Node.js local)

```powershell
# Instala las dependencias (solo la primera vez)
npm install

# Compila el proyecto
npm run build
```

## 📦 Resultado de la Compilación

Los archivos compilados se generan en la carpeta `dist/`:

```
dist/
├── index.html              # Página principal optimizada
├── thank-you.html          # Página de agradecimiento
├── assets/                 # Recursos optimizados
│   ├── main-[hash].css    # CSS minificado
│   ├── main-[hash].js     # JavaScript minificado
│   ├── *.jpg              # Imágenes optimizadas
│   └── logotapipiel.png   # Logo
└── DEPLOYMENT-GUIDE.md    # Guía de despliegue
```

## 🎯 Optimizaciones Incluidas

✅ **JavaScript**
- Minificado con Terser
- `console.log` eliminados
- Code splitting automático

✅ **CSS**
- SCSS compilado a CSS
- Minificado y optimizado
- Autoprefixer aplicado

✅ **Imágenes**
- Hash en nombres de archivo para cache busting
- Optimización de tamaño

✅ **HTML**
- Minificado
- Assets inline cuando es conveniente

## 🔍 Verificar el Build Localmente

Puedes previsualizar el build localmente:

### Con Docker:
```powershell
docker-compose exec dev npm run preview
```

### Sin Docker:
```powershell
npm run preview
```

Luego abre: http://localhost:4173

## 📤 Subir a Producción

### 1. Crear ZIP (Opcional)

```powershell
# En PowerShell
Compress-Archive -Path "dist\*" -DestinationPath "tapipiel-dist.zip" -Force
```

### 2. Subir Archivos

**Por FTP/SFTP:**
- Conecta a tu servidor
- Sube todo el contenido de `dist/` a `public_html/`

**Por cPanel:**
- File Manager → `public_html/`
- Upload el ZIP
- Extract all

**Por Netlify/Vercel:**
```powershell
# Netlify
netlify deploy --prod --dir=dist

# Vercel
vercel --prod
```

## 🐛 Solución de Problemas

### Imágenes no aparecen en producción
**✅ SOLUCIONADO:** Las imágenes cargadas dinámicamente (hero slider, CTA) ahora se importan correctamente en los módulos JavaScript usando imports de ES6. Vite las incluye automáticamente en el build.

### Error: "terser not found"
```powershell
docker-compose exec dev npm install -D terser
```

### Error: "vite: not found"
```powershell
docker-compose exec dev npm install
```

### El build falla con errores de SCSS
- Verifica que no haya errores de sintaxis en archivos `.scss`
- Los warnings de deprecación de SASS son normales y no afectan el build

### Archivos no se actualizan
- Elimina la carpeta `dist/` y vuelve a compilar:
```powershell
rm -r dist
docker-compose exec dev npm run build
```

## 📊 Estadísticas del Build

**Tamaños aproximados:**
- CSS: ~58 KB (~9.6 KB gzipped)
- JS: ~5-6 KB (~2 KB gzipped)
- HTML: ~52 KB (~8.5 KB gzipped)
- Imágenes: Variables (optimizadas)

**Tiempo de compilación:**
- Promedio: 2-3 segundos

## 🔄 Reconstruir Después de Cambios

```powershell
# 1. Haz tus cambios en los archivos fuente
# 2. Recompila
docker-compose exec dev npm run build

# 3. Verifica los cambios
docker-compose exec dev npm run preview
```

## 📝 Notas Importantes

- ⚠️ La carpeta `dist/` está en `.gitignore` (NO se versiona)
- ⚠️ Siempre compila antes de subir a producción
- ⚠️ Los archivos tienen hash para cache busting automático
- ✅ Los `console.log` se eliminan automáticamente en producción

## 🆘 Ayuda

Si tienes problemas:
1. Verifica que Docker esté corriendo
2. Revisa los logs: `docker-compose logs dev`
3. Reinicia el contenedor: `docker-compose restart dev`

---

**Última actualización:** Noviembre 12, 2025
