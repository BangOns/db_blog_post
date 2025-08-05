import { Request, Response, Router } from "express";

import { EditUser, getUserByIds, login, register } from "../controller/User";
import { authentication, authUser } from "../middleware/auth";
import {
  createPost,
  deletePost,
  editPost,
  getAllPost,
} from "../controller/Post";
import { getLikeAll, LikePost, UnlikePost } from "../controller/Like";
const route = Router();
route.get("/", async (req: Request, res: Response) => {
  res.send("Hello API Working");
});
route.post("/login", login);
route.post("/register", register);
route.put("/update/:id", authUser, EditUser);
route.get("/user/:id", authUser, getUserByIds);

// Post Routes
route.get("/posts", getAllPost);
route.post("/posts", authentication, createPost);
route.put("/posts/:id", authentication, editPost);
route.delete("/posts/:id", authentication, deletePost);

// Like Routes
route.get("/like", getLikeAll);
route.post("/like", authentication, LikePost);
route.delete("/like/:id", authentication, UnlikePost);

export default route;
