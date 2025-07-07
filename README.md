# 📰 Portal de Noticias — Trabajo Práctico de Ingeniería de Software

Este repositorio contiene el desarrollo completo del sistema **Portal de Noticias**, una aplicación web desarrollada como parte de la materia *Ingeniería de Software*. El proyecto cubre todas las fases del desarrollo de software, desde el análisis inicial hasta la implementación de una prueba de concepto funcional.

---

## 📌 Contenido del proyecto

- **📘 Análisis del sistema**  
  Planteamiento de la problemática, definición de objetivos, requerimientos funcionales y no funcionales, casos de uso, actores y especificaciones detalladas.

- **🧩 Arquitectura adoptada**  
  Arquitectura cliente-servidor con patrón Modelo-Vista-Controlador (MVC). Se incluyen diagramas, descripción de módulos y su correspondencia con los requerimientos del sistema.

- **🛠️ Diseño**  
  Modelo conceptual del sistema, estructura modular, descripción de componentes e interfaces de usuario para cada tipo de actor.

- **💡 Implementación (Prueba de Concepto)**  
  Aplicación web desarrollada con React + TypeScript, utilizando TailwindCSS para estilos y Leaflet para visualización geográfica. Se integran servicios externos como la API de normalización de direcciones de USIG.

- **📅 Planificación del proyecto**  
  Gestión del proyecto basada en el modelo de ciclo de vida **Sashimi**, con tareas, entregables y dependencias reflejadas en un diagrama de Gantt.

---

## 🚀 Tecnologías utilizadas

| Herramienta         | Uso principal                         |
|---------------------|----------------------------------------|
| **React + TypeScript** | Desarrollo de la SPA (Single Page App) |
| **TailwindCSS**     | Estilos rápidos y responsivos          |
| **Leaflet**         | Mapas interactivos y marcadores        |
| **Vite**            | Entorno de desarrollo rápido           |
| **API USIG**        | Normalización de direcciones           |

---

## 👥 Roles de usuarios

- **Visitantes**  
  - Visualización pública de noticias y mapa.

- **Vecinos (usuarios registrados)**  
  - Realizan preguntas, se suscriben al boletín y acceden a funcionalidades extendidas.

- **Administradores**  
  - Publican, editan y eliminan noticias. Responden preguntas, moderan contenido y administran boletines.

---

## 🧱 Estructura del código (src/)
/src
├── components → Componentes reutilizables (mapa, formulario, etc.)
├── Context → Context API (estado global y lógica compartida)
├── data → Datos simulados (noticias, preguntas, etc.)
├── types → Tipos y estructuras de datos TypeScript
└── App.tsx → Punto de entrada principal de la app

---

## 📎 Cómo correr el proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/portal-de-noticias.git
2. Instalar dependencias:
   ```bash
    npm install
   ```
4. Ejecutar la aplicación:
   ```bash
    npm run dev
    ```
5. Acceder desde el navegador:
    ```
      http://localhost:5173/
    ```
## 📂 Recursos adicionales:
Informse técnicos PDF
Diagramas de arquitectura y Gantt

## 📜 Licencia
Proyecto académico sin fines de lucro, realizado como parte de la cursada de Ingeniería de Software — Universidad Nacional de General Sarmiento.

---

