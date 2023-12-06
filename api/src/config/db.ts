import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const mongo = process.env.MONGO_URI


// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// } as ConnectOptions;

mongoose.connect(mongo);


const db = mongoose.connection

export default db;