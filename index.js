import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import personRouter from "./routes/person.js"
import connectTOdb from "./config/dbConfig.js";
config();
connectTOdb();
const app = express();

app.use(express.json())
app.use(morgan("common"))
app.use("/api/person", personRouter)
app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send("sorry! something happen!")
})

let port = process.env.PORT || 3500
app.listen(port, ()=>{console.log(`app is listening on port ${port}`)})