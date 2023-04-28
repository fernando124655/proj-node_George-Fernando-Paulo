import express from "express";
import alunos from "./alunos.js";
import cursos from "./cursos.js";
import categoria from "./categoria.js"

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pagina inicial");
});

router.use("/alunos", alunos);
router.use("/cursos", cursos);
router.use("/categoria", categoria)

export default router;
