import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./lib/mongodb.js";
import paginationRoutes from "./modules/pagination/pagination.routes.js";


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", paginationRoutes);

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });