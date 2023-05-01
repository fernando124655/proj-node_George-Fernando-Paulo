const divCursos = document.querySelector("#cursos");

async function consultaCursos() {
  const response = await fetch("http://localhost:3000/cursos");
  const cursos = await response.json();
  preencheTela(cursos);
}

function preencheTela(cursos) {
  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="rounded overflow-hidden mb-2">
            <img class="img-fluid" src="img/course-1.jpg" alt="">
            <div class="bg-secondary p-4">
                <div class="d-flex justify-content-between mb-3">
                    <small class="m-0"><i class="fa fa-users text-primary mr-2"></i>25 Students</small>
                    <small class="m-0"><i class="far fa-clock text-primary mr-2"></i>Carga horaria: ${curso.ch}h</small>
                </div>
                <a class="h5" href="">${curso.nome}</a>
                <div class="border-top mt-4 pt-4">
                    <div class="d-flex justify-content-between">
                        <h6 class="m-0"><i class="fa fa-star text-primary mr-2"></i>4.5 <small>(250)</small></h6>
                        <h5 class="m-0">$99</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
  });
}

consultaCursos();