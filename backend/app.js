import express from "express";
import { config } from "dotenv";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


// Dotenv Configuration
config({
  path: "./config/.env"
})


const corsOptions = {
  origin: ["https://www.braxas-intl.com", "http://localhost:5173", "https://user.braxas-intl.com"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

connectDb();

app.get("/", (req, res) => {
  res.send(process.env.FRONTEND_URL);
});

// Middlewares

app.get("/", (req, res) => {
  res.send(process.env.FRONTEND_URL);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// Routes
import Message from "./router/messageRouter.js";
import Employee from "./router/employeeRouter.js";

app.use("/api/v1/message", Message);
app.use("/api/v1/employee", Employee);




export default app;
