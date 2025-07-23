import { NextFunction, Request, Response } from "express";
import { Responsedata } from "../Scema/Response";
import * as jwt from "jsonwebtoken";
import { getUserById } from "../controller/User";
export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;
  const user = req.params.id;
  if (!headers || !user) {
    return Responsedata(
      { data: {}, message: "unauthorized", status: 401 },
      res
    );
  }
  const response = await getUserById(Number(user));
  if (response.status !== 200)
    return Responsedata(
      { data: {}, message: "user not found", status: 404 },
      res
    );
  if (response.data.token !== headers.split(" ")[1])
    return Responsedata(
      { data: {}, message: "invalid Token", status: 403 },
      res
    );
  const token = headers.split(" ")[1];
  const key = process.env.JWT_SECRET as string;
  jwt.verify(token, key, (err: any, decoded: any) => {
    if (err) {
      return Responsedata(
        { data: {}, message: "Invalid Token", status: 403 },
        res
      );
    }
    next();
  });
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;
  if (!headers) {
    return Responsedata(
      { data: {}, message: "unauthorized", status: 401 },
      res
    );
  }
  const token = headers.split(" ")[1];
  const key = process.env.JWT_SECRET as string;
  jwt.verify(token, key, (err: any, decoded: any) => {
    if (err) {
      return Responsedata(
        { data: {}, message: "Invalid Token", status: 403 },
        res
      );
    }
    next();
  });
};
