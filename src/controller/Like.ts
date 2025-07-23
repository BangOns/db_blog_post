import { Request, Response } from "express";
import { Responsedata, responseDataFunction } from "../Scema/Response";
import { Like } from "../type/like";
import { prisma } from "../libs/prisma";

export const ToggleLike = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body as Like;
    const response = await GetLikeByPostId(Number(userId));
    let responseLike;
    if (response.status !== 200) {
      responseLike = await LikePost(data);
    } else {
      responseLike = await UnlikePost(response.data.id);
    }

    return Responsedata(
      { data: responseLike.data, message: responseLike.message, status: 200 },
      res
    );
  } catch (error: any) {
    return Responsedata({ data: {}, message: error.message, status: 500 }, res);
  }
};
export const LikePost = async (data: Like) => {
  try {
    const dataLike = data;
    const response = await prisma.like.create({
      data: dataLike as Like,
    });
    return responseDataFunction({
      data: response,
      message: "Success like post",
      status: 200,
    });
  } catch (error: any) {
    return responseDataFunction({ data: {}, message: "error", status: 500 });
  }
};
export const UnlikePost = async (id: string) => {
  try {
    const response = await prisma.like.delete({
      where: {
        id,
      },
    });
    return responseDataFunction({
      data: {},
      message: "Success unlike post",
      status: 200,
    });
  } catch (error: any) {
    return responseDataFunction({ data: {}, message: "error", status: 500 });
  }
};
export const GetLikeByPostId = async (id: number) => {
  try {
    const response = await prisma.like.findFirst({
      where: {
        userId: id,
      },
    });
    if (!response) {
      throw Error("Like not found");
    }

    return responseDataFunction({
      data: response,
      message: "success",
      status: 200,
    });
  } catch (error: any) {
    return responseDataFunction({
      data: {},
      message: error.message || "error",
      status: 500,
    });
  }
};
