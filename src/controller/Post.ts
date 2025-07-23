import { Request, Response } from "express";

import { Responsedata, responseDataFunction } from "../Scema/Response";
import { prisma } from "../libs/prisma";

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const response = await prisma.post.findMany({
      include: {
        like: true,
      },
    });
    return Responsedata(
      { data: response, message: "success", status: 200 },
      res
    );
  } catch (error: any) {
    return Responsedata({ data: {}, message: "error", status: 500 }, res);
  }
};
export const createPost = async (req: Request, res: Response) => {
  try {
    const dataPost = req.body;
    dataPost.created_at = new Date();
    const response = await prisma.post.create({
      data: dataPost,
    });
    return Responsedata(
      { data: response, message: "success", status: 200 },
      res
    );
  } catch (error: any) {
    console.log(error);

    return Responsedata({ data: {}, message: "error", status: 500 }, res);
  }
};
export const editPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getPostById(id);
    if (response.status !== 200) {
      return Responsedata(
        { data: {}, message: "post not found", status: 404 },
        res
      );
    }
    const dataPost = req.body;
    const responseUpdate = await prisma.post.update({
      where: {
        id: id,
      },
      data: dataPost,
    });
    return Responsedata(
      { data: responseUpdate, message: "success", status: 200 },
      res
    );
  } catch (error) {
    console.log(error);

    return Responsedata({ data: {}, message: "error", status: 500 }, res);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return Responsedata(
      { data: response, message: "success", status: 200 },
      res
    );
  } catch (error) {
    return Responsedata({ data: {}, message: "error", status: 500 }, res);
  }
};

export const getPostById = async (id: string) => {
  try {
    const reponse = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return responseDataFunction({
      data: reponse,
      message: "success",
      status: 200,
    });
  } catch (error) {
    return responseDataFunction({ data: {}, message: "error", status: 500 });
  }
};
