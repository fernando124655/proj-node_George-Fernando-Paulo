const divCursos = document.querySelector("#cursos");

async function consultaCursos() {
  const response = await fetch("http://localhost:3000/cursos");
  const cursos = await response.json();
  return cursos;
}

async function preencheTela() {
  const cursos = await consultaCursos();
  console.log(cursos)

  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <div>
        ${curso.nome} - Carga Horaria: ${curso.ch} - categorias: ${curso.Categoria.map(c =>`${c.nome}`).join(', ')}
        <a href="edit_curso.html?curso_id=${curso.id}" >Edit  </a>
    </div>
    `;
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
  });
}

preencheTela();