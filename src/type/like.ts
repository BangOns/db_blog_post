export type TypesLike = {
  id: string;
  userId: number;
  postId: string;
};
export type Like = TypesLike;
export type UnLike = Pick<TypesLike, "id">;
