import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/db";
import path from "path"
import {
    errorResponserHandler,
    invalidPathHandler
} from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes"
import postRoutes from "./routes/postRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import commentRoutes from "./routes/commentRoutes"
import tagsRoutes from "./routes/tagsRoutes"
dotenv.config()

const port = process.env.PORT

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
    methods: "GET, PUT, PATCH, DELETE, POST"
}));


// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/user/", userRoutes)
app.use("/api/blog/", postRoutes)
app.use("/api/categories/", categoryRoutes)
app.use("/api/comment/", commentRoutes)
app.use("/api/tag/", tagsRoutes)
// midlewares
app.use(errorResponserHandler);
app.use(invalidPathHandler)


db.once('open', () => {
    console.log("Connected to Database");
});

db.once('error', (error: Error) => {
    console.log(error);
});


app.listen(port, () => {
    console.log("Server run at port:", port);

})