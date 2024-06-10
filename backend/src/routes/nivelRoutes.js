import NivelController from "../controller/nivelController.js";
import express from "express";

const router = express.Router();

router
    .get("/api/niveis", NivelController.listarNiveis)
    .get("/api/niveis/:id", NivelController.listarNivel)
    .post("/api/niveis", NivelController.criarNivel)
    .put("/api/niveis/:id", NivelController.atualizarNivel)
    .delete("/api/niveis/:id", NivelController.deletarNivel);

export default router;