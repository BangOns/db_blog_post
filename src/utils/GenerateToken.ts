import * as jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const GenerateToken = (id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1m",
  });
  return token;
};
export const GenerateRefreshToken = (id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
