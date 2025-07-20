import { Response } from "express";

type ResponseType = {
  status: number;
  message: string;
  data: any;
};
export const Responsedata = (response: ResponseType, res: Response) => {
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
    data: response.data,
  });
};
