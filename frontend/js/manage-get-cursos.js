const divCursos = document.querySelector("#cursos");

async function consultaCursos() {
  const response = await fetch("http://localhost:3000/cursos");
  const cursos = await response.json();
  return cursos;
}

async function consultaCategorias() {
  const response = await fetch("http://localhost:3000/categoria");
  const categorias = await response.json();
  return categorias;
}

async function preencheTela() {
  const cursos = await consultaCursos();
  const categorias = await consultaCategorias();

  console.log(categorias);

  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <div>
        ${curso.nome} - Carga Horaria: ${curso.ch} - categoria: ${categorias[cursos.categorias_id-1].nome}
    </div>
    `;
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
  });
}

preencheTela();