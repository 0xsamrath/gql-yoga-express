import { ctx } from "./context";

export const posts = async (
  _: any,
  _args: { take?: number; skip?: number },
  context: typeof ctx
) => {
  return context.prisma.post.findMany({
    take: _args?.take,
    skip: _args?.skip,
    include: {
      comments: true,
    },
  });
};

export const post = async (_: any, _args: { id: string }, context: typeof ctx) => {
  return context.prisma.post.findFirst({
    where: {
      id: _args.id,
    },
    include: {
      comments: true,
    },
  });
};

export const comments = async (
  _: any,
  _args: { take?: number; skip?: number; postId?: string },
  context: typeof ctx
) => {
  return context.prisma.comment.findMany({
    take: _args.take,
    skip: _args.skip,
    where: {
      postId: _args.postId
    },
    include: {
      post: true,
    },
  });
};

export const comment = async (
  _: any,
  _args: { id: string },
  context: typeof ctx
) => {
  return context.prisma.comment.findFirst({
    where: {
      id: _args.id,
    },
    include: {
      post: true,
    },
  });
};

export default {
  posts,
  post,
  comments,
  comment,
};
