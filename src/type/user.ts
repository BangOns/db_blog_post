export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginUser = Pick<User, "email" | "password">;
export type RegisterUser = Pick<User, "email" | "password" | "name">;
export type UpdateUser = Pick<User, "email" | "password" | "name" | "img">;
