import { ctx } from "./context";

export const createPost = async (
  _: any,
  _args: { title: string; content: string },
  context: typeof ctx
) => {
  const post = await context.prisma.post.create({
    data: { ..._args },
  });

  return post;
};

export const updatePost = async (
  _: any,
  _args: {
    id: string;
    title?: string;
    content?: string;
  },
  context: typeof ctx
) => {
  const post = await context.prisma.post.update({
    where: { id: _args.id },
    data: { title: _args.title, content: _args.content },
    include: { comments: true },
  });
  return post;
};

export const deletePost = async (
  _: any,
  _args: {
    id: string;
  },
  context: typeof ctx
) => {
  await context.prisma.comment.deleteMany({
    where: { postId: _args.id },
  });
  const post = await context.prisma.post.delete({
    where: { id: _args.id },
  });
  return post;
};

export const createComment = async (
  _: any,
  _args: { content: string; postId: string },
  context: typeof ctx
) => {
  const post = await context.prisma.post.findFirst({
    where: { id: _args.postId },
  });

  if (!post) return null;

  const comment = await context.prisma.comment.create({
    data: { ..._args },
  });

  return comment;
};

export const deleteComment = async (
  _: any,
  _args: {
    id: string;
  },
  context: typeof ctx
) => {
  const comment = await context.prisma.comment.delete({
    where: { id: _args.id },
  });
  return comment;
};

export default {
  createPost,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
};
