import { Request, Response, Router } from "express";
import { PrismaClient } from "../../generated/prisma";

import { EditImageUser, login, register } from "../controller/User";
import { authUser } from "../middleware/auth";
const route = Router();
const prisma = new PrismaClient();
route.get("/", async (req: Request, res: Response) => {
  res.send("Hello API Working");
});
route.post("/login", login);
route.post("/register", register);
route.put("/update/:id", authUser, EditImageUser);

export default route;
