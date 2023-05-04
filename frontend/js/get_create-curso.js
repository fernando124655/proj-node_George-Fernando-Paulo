const divCursos = document.querySelector("#create_curso");

async function consultaCursos() {
  const response = await fetch("http://localhost:3000/cursos");
  const cursos = await response.json();
  preencheTela(cursos);
}

function preencheTela(cursos) {
  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <label style="font-size: 20px" for="nome" >${curso.nome}</label>
        <br>
        <br>
        <label for="ch" >Carga Horária: ${curso.ch}</label>
        <div>
        
        <hr/>
    `;
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
  });
}

consultaCursos();