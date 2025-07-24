import * as dotenv from "dotenv";
import route from "./route/index";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
const port = process.env.PORT || 3001;
app.use(route);
app.use("/", (req: Request, res: Response) => {
  res.status(404).send("page not found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
