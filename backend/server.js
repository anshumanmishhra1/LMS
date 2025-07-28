import express from "express";
import { configDotenv } from "dotenv";
import { connectDb } from "./config/db.js";
import { userRouter } from "./router/userRouter.js";
import cookieParser from "cookie-parser";
configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());


// Connect to DB
connectDb();

app.use("/user",userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
