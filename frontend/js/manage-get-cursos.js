function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const access_token = getCookie('access_token');

const divCursos = document.querySelector("#cursos");

async function delete_course(course_id) {
  const response = await fetch(`http://localhost:3000/cursos/${course_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "authorization": `Bearer ${access_token}`,
      }
  });
  console.log(response)
  alert("Deletado");
  location.reload()
}

async function consultaCursos() {
  console.log(access_token);
  const fetch_json = {
    headers: {
      "authorization": `Bearer ${access_token}`,
    }
  };
  console.log(fetch_json);
  const response = await fetch("http://localhost:3000/cursos", fetch_json);
  const response_json = await response.json();
  console.log(response_json);

  if(response.statusText == "Unauthorized"){
    //alert("Login necessario");
    //window.location.replace("/frontend/login.html");
  }
  //const cursos = await response.json();
  return response_json;
}

async function preencheTela() {
  const cursos = await consultaCursos();
  console.log(cursos)

  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <div id="${curso.id}">
        ${curso.nome} - Carga Horaria: ${curso.ch} - categorias: ${curso.Categoria.map(c =>`${c.nome}`).join(', ')}
        <a href="edit_curso.html?curso_id=${curso.id}" >Edit  </a>
        <button id="submit_deletar_curso_${curso.id}" class="submit_deletar_curso">deletar</button>
    </div>
    `;
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
    
  });

  var submit_delete_course = document.getElementsByClassName(`submit_deletar_curso`);
  for (let submit of submit_delete_course) {
    console.log(submit)
  
    submit.addEventListener('click', function(e) {
      e.preventDefault();
      course_id = e.currentTarget.parentNode.id;
      delete_course(course_id)
    })
  }
}

preencheTela();