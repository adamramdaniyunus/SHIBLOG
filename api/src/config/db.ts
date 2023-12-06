import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const mongo: string = process.env.MONGO_URI

mongoose.connect(mongo);

const db = mongoose.connection

export default db;