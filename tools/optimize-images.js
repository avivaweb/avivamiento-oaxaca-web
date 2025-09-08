
const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

// Directorio donde se encuentran las imágenes originales
const inputDir = 'public/img';
// Directorio donde se guardarán las imágenes optimizadas
const outputDir = 'public/img/webp';

// Asegurarse de que el directorio de salida exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Buscar todas las imágenes .png, .jpg, .jpeg
glob(`${inputDir}/**/*.{png,jpg,jpeg}`, (err, files) => {
  if (err) {
    console.error('Error al buscar imágenes:', err);
    return;
  }

  console.log(`Encontradas ${files.length} imágenes para optimizar.`);

  files.forEach(file => {
    const inputFile = path.resolve(file);
    const filename = path.basename(file, path.extname(file));
    const outputFile = path.resolve(outputDir, `${filename}.webp`);

    // Usar Sharp para convertir a WebP y comprimir
    sharp(inputFile)
      .webp({ quality: 80 }) // Ajusta la calidad aquí (1-100)
      .toFile(outputFile, (err, info) => {
        if (err) {
          console.error(`Error al optimizar ${inputFile}:`, err);
        } else {
          console.log(`Imagen optimizada: ${outputFile} (Tamaño: ${Math.round(info.size / 1024)} KB)`);
        }
      });
  });
});
