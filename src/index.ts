import * as dotenv from "dotenv";
dotenv.config();
import route from "./route/index";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import cors from "cors";
import express from "express";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://db-blog-post.vercel.app",
];
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;
app.use(route);
app.use("/", (req: Request, res: Response) => {
  res.status(404).send("page not found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
