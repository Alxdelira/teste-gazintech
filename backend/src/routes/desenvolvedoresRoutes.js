import DesenvolvvedoresController from "../controller/desenvolvedoresController.js";
import express from "express";

const router = express.Router();

router
    .get("/api/desenvolvedores", DesenvolvvedoresController.listarDesenvolvedores)
    .get("/api/desenvolvedores/:id", DesenvolvvedoresController.listarDesenvolvedorId)
    .post("/api/desenvolvedores", DesenvolvvedoresController.criarDesenvolvedor)
    .put("/api/desenvolvedores/:id", DesenvolvvedoresController.atualizarDesenvolvedor)
    .delete("/api/desenvolvedores/:id", DesenvolvvedoresController.deletarDesenvolvedor);

export default router;