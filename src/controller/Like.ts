import { Request, Response } from "express";
import { Responsedata, responseDataFunction } from "../Scema/Response";
import { Like } from "../type/like";
import { prisma } from "../libs/prisma";

// export const ToggleLike = async (req: Request, res: Response) => {
//   try {
//     const data = req.body as Like;
//     const response = await GetLikeByPostId(data.userId, data.postId);
//     let responseLike;
//     if (response.status !== 200) {
//       responseLike = await LikePost(data);
//     } else {
//       responseLike = await UnlikePost(response.data.id);
//     }

//     return Responsedata(
//       { data: responseLike.data, message: responseLike.message, status: 200 },
//       res
//     );
//   } catch (error: any) {
//     return Responsedata({ data: {}, message: error.message, status: 500 }, res);
//   }
// };
export const LikePost = async (req: Request, res: Response) => {
  try {
    const data = req.body as Like;

    const response = await prisma.like.create({
      data: data as Like,
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
export const UnlikePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return responseDataFunction({
        data: {},
        message: "Post ID is required",
        status: 400,
      });
    }
    await prisma.like.delete({
      where: {
        id: id as string,
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
export const GetLikeByPostId = async (id: number, postId: string) => {
  try {
    const response = await prisma.like.findFirst({
      where: {
        userId: id,
        postId: postId,
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
