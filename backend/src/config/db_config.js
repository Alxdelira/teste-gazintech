import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {         
        });
        console.log("Conectado com o Banco de Dados!");
    } catch (error) {
        console.error("Error ao tentar conectar com MongoDB:", error);
        throw new Error("Erro de conexão com o database");
    }
}


connectToDatabase();


const db = mongoose.connection;

export default db;