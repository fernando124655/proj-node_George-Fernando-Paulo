import express from "express";
import { categoria } from "../models/index.js";
import { CategoriaController } from "../controller/categoria.controller.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

const categoriaController = new CategoriaController(categoria);

router.get("/", async (req, res) => {
  const categoria = await categoriaController.getAll();
  res.json(categoria);
});

router.post(
  "/create",
  [
    //validação dos dados
    body("nome").trim().notEmpty().withMessage("O campo nome é obrigatório!"),
    body("descricao").trim().notEmpty().withMessage("O campo descrição é obrigatório!"),
  ],
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //se os dados forem válidos, o sistema executará aqui
    const { nome, descricao } = req.body;
    await categoriaController.adicionar({ nome, descricao });
    res.status(201).send("Categoria criada com sucesso!");
  }
);

export default router;
