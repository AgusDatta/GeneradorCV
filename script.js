function agregarExperiencia() {
  const div = document.createElement("div");
  div.classList.add("experiencia-entry");
  div.innerHTML = `
    <label>Empresa:
      <input type="text" name="exp_empresa[]" />
    </label>
    <label>Puesto:
      <input type="text" name="exp_puesto[]" />
    </label>
    <label>Desde:
      <input type="text" name="exp_desde[]" />
    </label>
    <label>Hasta:
      <input type="text" name="exp_hasta[]" />
    </label>
    <label>Descripción:
      <textarea name="exp_descripcion[]" rows="3"></textarea>
    </label>`;
  document.getElementById("experiencias").appendChild(div);
}

function agregarEducacion() {
  const div = document.createElement("div");
  div.classList.add("educacion-entry");
  div.innerHTML = `
    <label>Institución:
      <input type="text" name="edu_institucion[]" />
    </label>
    <label>Título:
      <input type="text" name="edu_titulo[]" />
    </label>
    <label>Desde:
      <input type="text" name="edu_desde[]" />
    </label>
    <label>Hasta:
      <input type="text" name="edu_hasta[]" />
    </label>
    <label>Descripción:
      <textarea name="edu_descripcion[]" rows="3"></textarea>
    </label>`;
  document.getElementById("educaciones").appendChild(div);
}

function agregarProyecto() {
  const div = document.createElement("div");
  div.classList.add("proyecto-entry");
  div.innerHTML = `
    <label>Título del proyecto:
      <input type="text" name="proyecto_titulo[]" />
    </label>
    <label>Descripción:
      <textarea name="proyecto_descripcion[]" rows="3"></textarea>
    </label>`;
  document.getElementById("proyectos").appendChild(div);
}

document.getElementById("cvForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const reader = new FileReader();
  const imageInput = document.getElementById("fotoPerfil").files[0];

  reader.onloadend = function () {
    const fotoBase64 = reader.result;
    generarPDF(fotoBase64);
  };

  if (imageInput) {
    reader.readAsDataURL(imageInput);
  } else {
    generarPDF(null);
  }
});

function generarPDF(fotoBase64) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;
  const imageSize = 35;

  function checkAddPage(increment) {
    if (y + increment >= 280) {
      doc.addPage();
      y = 20;
    }
  }

  const nombre = document.getElementById("nombre").value;
  const titulo = document.getElementById("titulo").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const sobreMi = document.getElementById("perfil").value;

  const experiencias = Array.from(document.querySelectorAll(".experiencia-entry")).map(e => ({
    empresa: e.querySelector('[name="exp_empresa[]"]').value.trim(),
    puesto: e.querySelector('[name="exp_puesto[]"]').value.trim(),
    desde: e.querySelector('[name="exp_desde[]"]').value.trim(),
    hasta: e.querySelector('[name="exp_hasta[]"]').value.trim(),
    descripcion: e.querySelector('[name="exp_descripcion[]"]').value.trim(),
  }));

  const educaciones = Array.from(document.querySelectorAll(".educacion-entry")).map(e => ({
    institucion: e.querySelector('[name="edu_institucion[]"]').value.trim(),
    titulo: e.querySelector('[name="edu_titulo[]"]').value.trim(),
    desde: e.querySelector('[name="edu_desde[]"]').value.trim(),
    hasta: e.querySelector('[name="edu_hasta[]"]').value.trim(),
    descripcion: e.querySelector('[name="edu_descripcion[]"]').value.trim(),
  }));

  const proyectos = Array.from(document.querySelectorAll(".proyecto-entry")).map(p => ({
    titulo: p.querySelector('[name="proyecto_titulo[]"]').value.trim(),
    descripcion: p.querySelector('[name="proyecto_descripcion[]"]').value.trim(),
  }));

  const habilidades = document.getElementById("habilidades").value.split(',').map(h => h.trim()).filter(h => h);

  if (fotoBase64) {
    doc.addImage(fotoBase64, 'JPEG', pageWidth - margin - imageSize, y, imageSize, imageSize);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(nombre, margin, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  const tituloLines = doc.splitTextToSize(titulo, maxWidth - imageSize - 5);
  doc.text(tituloLines, margin, y + 13);

  const lineasTitulo = tituloLines.length;

  doc.setFontSize(11);
  doc.setTextColor(100);
  const yInfo = y + 13 + lineasTitulo * 6;
  doc.text(`Ubicación: ${ubicacion}`, margin, yInfo);
  doc.text(`Email: ${email}`, margin, yInfo + 6);
  doc.text(`Teléfono: ${telefono}`, margin, yInfo + 12);
  doc.setTextColor(0);

  // Ajustar y según altura total
  const alturaBloqueIzq = 12 + lineasTitulo * 6 + 18; // 18 = espacio para 3 líneas de info
  const alturaImagen = fotoBase64 ? imageSize : 0;
  y += Math.max(alturaBloqueIzq, alturaImagen) + 10;

  // Sobre mí
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Sobre mí", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80);
  const sobreMiLines = doc.splitTextToSize(sobreMi, maxWidth);
  checkAddPage(sobreMiLines.length * 6);
  doc.text(sobreMiLines, margin, y);
  y += sobreMiLines.length * 6 + 6;
  doc.setTextColor(0);

  // EXPERIENCIA
  if (experiencias.length) {
    const espacioMinimo = 20; // título + 1 entrada mínima
    checkAddPage(espacioMinimo);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Experiencia Laboral", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    experiencias.forEach(exp => {
      const tituloEmpresa = `${exp.empresa}`;
      const subtitulo = `${exp.puesto}`;
      const fecha = `${exp.desde} - ${exp.hasta}`;

      doc.setFont("helvetica", "bold");
      doc.text(tituloEmpresa, margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(fecha, pageWidth - margin - doc.getTextWidth(fecha), y);
      y += 5;

      if (subtitulo) {
        doc.text(subtitulo, margin, y);
        y += 5;
      }

      if (exp.descripcion) {
        doc.setTextColor(68);
        const lines = doc.splitTextToSize(exp.descripcion, maxWidth);
        checkAddPage(lines.length * 6);
        doc.text(lines, margin, y);
        y += lines.length * 6 + 4;
        doc.setTextColor(0);
      } else {
        y += 4;
      }
    });
  }

  // EDUCACION
  if (educaciones.length) {
    const espacioMinimo = 20;
    checkAddPage(espacioMinimo);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Educación", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    educaciones.forEach(edu => {
      const tituloInstitucion = `${edu.institucion}`;
      const subtitulo = `${edu.titulo}`;
      const fecha = `${edu.desde} - ${edu.hasta}`;

      doc.setFont("helvetica", "bold");
      doc.text(tituloInstitucion, margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(fecha, pageWidth - margin - doc.getTextWidth(fecha), y);
      y += 5;

      if (subtitulo) {
        doc.text(subtitulo, margin, y);
        y += 5;
      }

      if (edu.descripcion) {
        doc.setTextColor(68);
        const lines = doc.splitTextToSize(edu.descripcion, maxWidth);
        checkAddPage(lines.length * 6);
        doc.text(lines, margin, y);
        y += lines.length * 6 + 4;
        doc.setTextColor(0);
      } else {
        y += 4;
      }
    });
  }

  // Proyectos
  if (proyectos.length) {
    const espacioMinimo = 20;
    checkAddPage(espacioMinimo);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Proyectos", margin, y);
    y += 6;

    proyectos.forEach(proj => {
      checkAddPage(20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(proj.titulo, margin, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(90);
      const lines = doc.splitTextToSize(proj.descripcion, maxWidth);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 4;
      doc.setTextColor(0);
    });
  }

  // Habilidades
  if (habilidades.length) {
    const espacioMinimo = 16;
    checkAddPage(espacioMinimo);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Habilidades", margin, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(90);
    const habilidadesTexto = habilidades.join(" · ");
    const habilidadesLines = doc.splitTextToSize(habilidadesTexto, maxWidth);
    doc.text(habilidadesLines, margin, y);
    y += habilidadesLines.length * 5 + 4;
    doc.setTextColor(0);
  }

  doc.save(`CV_${nombre}.pdf`);
}
