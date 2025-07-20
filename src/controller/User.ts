import { Request, Response } from "express";
import { LoginUser, RegisterUser, UpdateUser } from "type/user";
import { PrismaClient } from "../../generated/prisma";
import { Responsedata } from "../Scema/Response";
import { GenerateRefreshToken, GenerateToken } from "../utils/GenerateToken";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email } = req.body as LoginUser;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      const refreshToken = GenerateRefreshToken(user.id);
      const response = await EditTokenUser({
        id: user.id,
        token: refreshToken,
      });
      Responsedata(
        { status: 200, message: "success", data: response.data },
        res
      );
    } else {
      throw new Error("user not found");
    }
  } catch (error: any) {
    console.error(error.message as string);

    Responsedata(
      { status: 500, message: error.message as string, data: error },
      res
    );
  }
};
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body as RegisterUser;
  const responseValidate = await validateUser(req.body);
  if (responseValidate.status === 500) {
    Responsedata(
      {
        data: {},
        message: responseValidate.message,
        status: responseValidate.status,
      },
      res
    );
  }
  const response = await prisma.user.create({
    data: req.body,
  });
  Responsedata(
    {
      data: response,
      message: "success",
      status: 200,
    },
    res
  );
};

export const EditUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { img } = req.body as UpdateUser;
  const datas = {
    img,
  };
  try {
    const responseId = await getUserById(Number(id));
    if (responseId.status === 500) {
      throw new Error(responseId.message);
    }
    const response = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: datas,
    });

    Responsedata(
      {
        data: response,
        message: "success",
        status: 200,
      },
      res
    );
  } catch (error: any) {
    Responsedata(
      {
        data: {},
        message: error.message,
        status: 500,
      },
      res
    );
  }
};
export const EditImageUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { img } = req.body as UpdateUser;
  const datas = {
    img,
  };
  try {
    const responseId = await getUserById(Number(id));
    if (responseId.status === 500) {
      throw new Error(responseId.message);
    }
    const response = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: datas,
    });

    Responsedata(
      {
        data: response,
        message: "success",
        status: 200,
      },
      res
    );
  } catch (error: any) {
    Responsedata(
      {
        data: {},
        message: error.message,
        status: 500,
      },
      res
    );
  }
};
export const EditTokenUser = async (data: { id: number; token: string }) => {
  const datas = {
    token: data.token,
  };
  try {
    const responseId = await getUserById(Number(data.id));
    if (responseId.status === 500) {
      throw new Error(responseId.message);
    }
    const response = await prisma.user.update({
      where: {
        id: Number(data.id),
      },
      data: datas,
    });

    return {
      status: 200,
      message: "success",
      data: response,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message as string,
      data: error,
    };
  }
};
export const getUserById = async (id: number) => {
  try {
    const response = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!response) {
      throw new Error("user not found");
    }
    return {
      status: 200,
      message: "success",
      data: response,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message as string,
      data: error,
    };
  }
};
export const validateUser = async (data: LoginUser) => {
  try {
    const response = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (response) {
      throw new Error("user is exist");
    }
    return {
      status: 200,
      message: "success",
      data: {},
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message as string,
      data: error,
    };
  }
};
