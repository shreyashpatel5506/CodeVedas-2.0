import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectToMongo from "./db.js";
import authRoutes from "./Routes/authRoute.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// Connect to MongoDB
connectToMongo();

// Logging middleware
app.use(morgan("dev"));

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3001", // Your frontend URL
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests (OPTIONS method)
app.options("*", cors());

// Define routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
