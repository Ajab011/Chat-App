import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-Parser";
dotenv.config();
const app=express();
// app.get("/",(req,res)=>{
//   res.send("hello")
// })


// const port=process.env.PORT;
// app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRoutes)

app.listen(5001,()=>{
    console.log("server is running");
    connectDB()
})
