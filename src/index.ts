import route from "./route/index";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://db-blog-post.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);
app.use("/", (req: Request, res: Response) => {
  res.status(404).send("page not found");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
