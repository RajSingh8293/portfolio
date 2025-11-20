import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
import connectDb from "./db/connectDb.js";
import userRouter from "./routes/user.routes.js";
import heroRouter from "./routes/hero.routes.js";
import aboutRouter from "./routes/about.routes.js";
import projectRouter from "./routes/project.routes.js";
const port = process.env.PORT || 3000;

// CORS
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// Routes
app.use("/api/users", userRouter);
app.use("/api/hero", heroRouter);
app.use("/api/about", aboutRouter);
app.use("/api/projects", projectRouter);

// Connect DB & start server

connectDb();
app.listen(port, () => console.log(`Server running on port ${port}`));
