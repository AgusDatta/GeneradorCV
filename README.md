# Generador de Curriculum Vitae Online

Este proyecto es una aplicación web sencilla desarrollada con **HTML**, **CSS** y **JavaScript**, que permite generar un Curriculum Vitae en formato **PDF** a partir de un formulario dinámico completado por el usuario.

---

## 📁 Estructura del Proyecto
```
agusdatta-generadorcv/
├── README.md
├── index.html
├── script.js
└── styles.css
```
---

## 🌐 index.html

Archivo principal de la interfaz. Contiene un formulario donde se ingresan los siguientes datos:

- **Datos personales** (nombre, título, ubicación, email, teléfono, sobre mí)
- **Foto de perfil** (opcional, con vista previa)
- **Experiencia laboral** (dinámica, se pueden agregar múltiples entradas)
- **Educación** (dinámica)
- **Proyectos** (dinámica)
- **Habilidades** (lista separada por comas)

Incluye los enlaces necesarios a `styles.css`, `script.js` y la biblioteca `jsPDF`.

---

## 🧠 script.js

Maneja la lógica del formulario:

- Permite **agregar dinámicamente** múltiples entradas para experiencia, educación y proyectos.
- Procesa los datos al enviar el formulario.
- Convierte los datos ingresados a un documento PDF usando **jsPDF**, incluyendo:
  - Foto de perfil (si fue cargada)
  - Formato estructurado y con diseño
  - Ajuste automático de páginas si el contenido es largo

El archivo también maneja validaciones básicas y posicionamiento dinámico del contenido en el PDF.

---

## 🎨 styles.css

Aplica un estilo moderno y limpio al formulario:

- Usa una paleta clara y profesional.
- Tipografía legible (`Segoe UI`, `Tahoma`, `Verdana`, etc.).
- Estilo responsivo para pantallas pequeñas.
- Botones estilizados con hover y active.
- Inputs bien espaciados y con realce en focus.
- Estructura visual clara usando fieldsets y leyendas.

---

## 📝 Cómo usar

1. Cloná o descargá el repositorio.
2. Abrí `index.html` en tu navegador.
3. Completá el formulario con tus datos.
4. Hacé clic en **"Generar PDF"**.
5. Se descargará automáticamente un archivo `CV_TuNombre.pdf`.

---

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- [jsPDF](https://github.com/parallax/jsPDF) (para la generación del PDF)

---

## 📌 Notas

- No se utiliza backend: toda la lógica corre en el navegador.
- La foto se incorpora al PDF en base64.
- Los campos de experiencia, educación y proyectos pueden expandirse sin límite.
- Es ideal para crear y exportar CVs rápidamente sin herramientas externas.

---

## 📄 Licencia

Este proyecto es de uso libre y educativo. Podés modificarlo y adaptarlo a tus necesidades.

---
