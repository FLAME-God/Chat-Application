import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pgClient = new Client(process.env.POSTGRESQL_URL );

async function dbConnection() {
    await pgClient.connect();
    console.log("Database connected successfuly");
}

export default dbConnection;