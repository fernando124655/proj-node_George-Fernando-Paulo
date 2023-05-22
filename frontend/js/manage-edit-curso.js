const divCurso = document.querySelector("#curso");

var params = location.search.substring(1).split("&").map(str => str.split('='));
params = Object.fromEntries(params);
console.log(params);

async function update_course(name, ch, categories_ids) {
    const response = await fetch(`http://localhost:3000/cursos/${params.curso_id}`, {
        method: "PATCH",
        body: JSON.stringify({
            "nome": name,
            "ch": ch,
            "categoria_ids": categories_ids
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    });
    console.log(response)
    alert("Salvo com sucesso");
    location.reload()
}

async function consultaCursos() {
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
        <div class="edit_curso">
            <label for="nome"> Nome do Curso:</label>
            <input type="text" id="nome" name="nome" placeholder="Curso" required value="${curso.nome}">
            
            <label for="ch" >Carga Horária:</label>
            <input type="text" id="ch" name="ch" placeholder="Carga Horária" required value="${curso.ch}">

            <label for="categoria" >Categoria:</label>
            <div id="categorias">
                ${
                    curso.Categoria.map((curso_categoria, i) => 
                        `
                        
                        <div>
                        <select name="categoria" id="categoria_${i}" placeholder="Categoria" required>
                            ${categorias.map(
                                c => 
                                    `<option ${curso_categoria.id == c.id ? "selected" : ""} value="${c.id}">${c.nome}</option>`
                                ).join('')
                            }
                        </select>
                        <button id="submit_remove_category" class="btn-remove">Remove</button>
                        </div>
                        `
                    ).join('')
                }
            </div>
            <button id="submit_new_category" class="btn btn-add">New Category </button>            
            <button id="submit_update_course" class="btn btn-save" >Salvar</button>
        </div>
    </form>
    `;
    divCurso.innerHTML = divCurso.innerHTML + novoCursoHTML;

    
    var submit_update_course = document.getElementById('submit_update_course');

    submit_update_course.addEventListener('click', function(event) {
        event.preventDefault();
        
        var course_form = document.forms["curso_edit"];
        
        var course_name = course_form.elements["nome"].value;
        var course_ch = course_form.elements["ch"].value;
        var course_categories = document.getElementsByName("categoria");

        console.log(course_name, course_ch)

        categories_ids = []

        course_categories.forEach(categorie => {
            categories_ids.push(parseInt(categorie.value))
        });

        update_course(course_name, course_ch, categories_ids)
    });

    var submit_new_category = document.getElementById('submit_new_category');

    submit_new_category.addEventListener('click', function(event) {
        event.preventDefault();

        div_categories = document.getElementById('categorias')

        var course_categories_len = document.getElementsByName("categoria").length;
        
        new_html = `
            <div>
            <select name="categoria" id="categoria_${course_categories_len}" placeholder="Categoria" required>
                ${categorias.map(
                    c => 
                        `<option value="${c.id}">${c.nome}</option>`
                    ).join('')
                }
            </select>
            <button id="submit_remove_category" class="btn-remove">Remove</button>
            </div>
        `
        
        div_categories.innerHTML = div_categories.innerHTML + new_html;
        

       
        var submit_delete_course = document.getElementsByClassName(`btn-remove`);
        for (let submit of submit_delete_course) {
            console.log(submit)
        
            submit.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(e.currentTarget.parentNode.remove())
            })
        }
    })

    var submit_delete_course = document.getElementsByClassName(`btn-remove`);
    for (let submit of submit_delete_course) {
        console.log(submit)
    
        submit.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(e.currentTarget.parentNode.remove())
        })
    }
}


preencheTela();
  
