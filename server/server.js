import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import {connectDB} from './lib/db.js'
import userRouter from './routes/userRoutes.js';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json({limit: "4mb"}));
app.use(cors());

// Routes
app.use("/api/status", (req,res)=> res.send("Server is live"));
app.use("/api/auth", userRouter);

// DB connect
await connectDB();

const PORT = process.env.port || 5001


server.listen(PORT, () => console.log("Server is running on port:"+PORT));