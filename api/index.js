import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json())
app.use(cors({
  credentials: true,
}));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next)=>{
   const statusCode = err.statusCode || 500;
   const message = err.message || "Internal server error";
   return res.status(statusCode).json({
      success: false,
      statusCode,
      message
   })
   
})