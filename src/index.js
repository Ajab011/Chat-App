import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-Parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
dotenv.config();
const app=express();
// app.get("/",(req,res)=>{
//   res.send("hello")
// })

// const port=process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.listen(5001,()=>{
    console.log("server is running 5001");
    connectDB()
})
