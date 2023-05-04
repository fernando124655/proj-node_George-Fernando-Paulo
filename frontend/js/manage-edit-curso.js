const divCurso = document.querySelector("#curso");

async function updateCurso() {
    // const form = document.querySelector("#curso_edit_form");
    console.log("asd")
}

async function salvarCurso(curso) {
    const response = await fetch(`http://localhost:3000/cursos/${params.curso_id}`, {
        method: "POST",
        body: JSON.stringify({
          userId: 1,
          title: "Fix my bugs",
          completed: false
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    });
    const cursos = await response.json();
    return cursos;
}

async function consultaCursos() {
    var params = location.search.substring(1).split("&").map(str => str.split('='));
    params = Object.fromEntries(params);
    console.log(params);
    const response = await fetch(`http://localhost:3000/cursos/${params.curso_id}`);
    const cursos = await response.json();
    return cursos;
}

async function consultaCategorias() {
    const response = await fetch(`http://localhost:3000/categoria/`);
    const categorias = await response.json();
    return categorias;
}

async function preencheTela() {
    const curso = await consultaCursos();
    const categorias = await consultaCategorias();
    console.log(categorias);
    const novoCursoHTML = `
    <form name="curso_edit" method="post" id="curso_edit_form">
        <div>
            <label for="nome"> Nome do Curso:</label>
            <input type="text" id="nome" name="nome" placeholder="Curso" required value="${curso.nome}">
            
            <label for="ch" >Carga Horária:</label>
            <input type="text" id="ch" name="ch" placeholder="Carga Horária" required value="${curso.ch}">

            <label for="categoria" >Categoria:</label>
            ${
                curso.Categoria.map((curso_categoria, i) => 
                    `
                    <select name="categoria_${i}" id="categoria_${i}" placeholder="Categoria" required>
                        ${categorias.map(
                            c => 
                                `<option ${curso_categoria.id == c.id ? "selected" : ""} value="${c.id}">${c.nome}</option>`
                            ).join('')
                        }
                    </select>
                    <button onclick="#">Remove</button>
                    `
                ).join('')
            }
            <button onclick="#">New Category </button>

            
            <button onclick="await updateCurso()">Salvar</button>
        </div>
    </form>
    `;
    divCurso.innerHTML = divCurso.innerHTML + novoCursoHTML;
}

preencheTela();
  
