const divCurso = document.querySelector("#curso");

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
    var count_c = 0;
    const novoCursoHTML = `
    <div>
        <label for="nome" > Nome do Curso:</label>
        <input type="text" id="nome" placeholder="Curso" required value="${curso.nome}">
        
        <label for="ch" >Carga Horária:</label>
        <input type="text" id="ch" placeholder="Carga Horária" required value="${curso.ch}">

        <label for="categoria" >Categoria:</label>
        ${
            curso.Categoria.map(curso_categoria => 
                `
                <select> id="categoria_${count_c++}" placeholder="Categoria" required>
                    ${categorias.map(
                        c => 
                            `<option ${curso_categoria.id == c.id ? "selected" : ""} value="${c.id}">${c.nome}</option>`
                        ).join('')
                    }
                </select>
                `
            ).join('')
        }
        

        <button onclick="return false;" id="btn-salvar" > Salvar</button>
    <div></div>
    `;
    divCurso.innerHTML = divCurso.innerHTML + novoCursoHTML;
}

preencheTela();
  
