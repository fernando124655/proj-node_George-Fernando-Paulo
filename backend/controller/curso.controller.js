// import { cursoCategoriaController } from "./index.js";
import { categoria } from "../models/index.js";

export default class CursoController {
  constructor(CursoModel) {
    this.curso = CursoModel;
  }

  async getByID(id) {
    const c = this.curso.findOne({
      where: {
        id: id,
      },
      include: categoria,
    });
    return c;
  }

  async getAll() {
    const cursos = await this.curso.findAll({include: categoria});
    return cursos;
  }

  async adicionar(cursoDTO) {
    const categoria_ids = cursoDTO['categoria_ids'];
    try {
      console.log(cursoDTO);
      const c = await this.curso.create(cursoDTO);
      console.log(c);
      await categoria_ids.forEach(async categoria_id => {
        const category = await categoria.findOne({where: {id:categoria_id}})
        await c.addCategoria(category);
      })
    } catch (error) {
      console.log(error);
    }
  }
}
