import dotenv from "dotenv";
dotenv.config();
import path from "path";

import express from "express";
import cors from "cors";
import { db_connect } from "./configs/database.config";
import productrouter from "./router/product.router";

db_connect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

const port = 5000;

app.use("/api/products", productrouter);
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
