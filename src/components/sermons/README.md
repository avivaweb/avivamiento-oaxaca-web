
# Componentes de Sermones

Este directorio contiene todos los componentes de React relacionados con la sección de "Sermones" de la aplicación.

## Componentes

### `SermonsPage.jsx` (Página principal)

Es el componente principal que orquesta la página de sermones.

- **Estado**: Maneja el estado de los sermones filtrados (`filteredSermons`).
- **Lógica de Búsqueda**: Contiene la función `handleSearch` que filtra los sermones basándose en los criterios de búsqueda (título, descripción, predicador y fecha).
- **Renderizado**: Renderiza los componentes `SermonSearch` y `SermonsList`.

### `SermonSearch.jsx`

Componente que proporciona la interfaz de usuario para filtrar los sermones.

- **Props**:
  - `onSearch`: Una función callback que se ejecuta cuando el usuario envía el formulario de búsqueda. Devuelve un objeto con los filtros aplicados.
- **Campos**:
  - Búsqueda por texto (título o tema).
  - Nombre del predicador.
  - Fecha.

### `SermonsList.jsx`

Componente que renderiza la lista de sermones.

- **Props**:
  - `sermons`: Un array de objetos de sermón que se deben mostrar.
- **Renderizado**: Mapea el array `sermons` y renderiza un componente `SermonCard` para cada uno.

### `SermonCard.jsx`

Componente que muestra la información de un único sermón en una tarjeta.

- **Props**:
  - `sermon`: Un objeto que contiene los detalles del sermón (título, predicador, fecha, URL del video, descripción).
- **Renderizado**: Muestra el video incrustado de YouTube, el título, el predicador y la descripción del sermón.

## Flujo de Datos

1.  **`SermonsPage.jsx`**: Carga los datos iniciales desde `src/data/sermonsData.js`.
2.  **`SermonSearch.jsx`**: El usuario introduce los criterios de búsqueda y pulsa "Buscar". Se llama a la función `onSearch`.
3.  **`SermonsPage.jsx`**: La función `handleSearch` recibe los filtros, aplica la lógica para filtrar el array de sermones y actualiza el estado `filteredSermons`.
4.  **`SermonsList.jsx`**: Recibe la nueva lista de `filteredSermons` y la renderiza, mostrando solo los resultados que coinciden.

## Cómo Usar

Para utilizar estos componentes, simplemente importa `SermonsPage.jsx` en tu sistema de rutas (por ejemplo, en `App.jsx`).

```jsx
import SermonsPage from './pages/SermonsPage';

// Dentro de tu router
<Route path="/sermones" element={<SermonsPage />} />
```
