export const typeDefs = `
  scalar Date

  type Post {
    id: String
    title: String
    content: String
    comments: [Comment]
    createdAt: Date
    updatedAt: Date
  }

  type Comment {
    id: String
    content: String
    post: Post
    postId: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    posts(take: Int, skip: Int): [Post]
    comments(take: Int, skip: Int, postId: String): [Comment]
    post(id: String!): Post
    comment(id: String!): Comment
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: String!, title: String, content: String): Post
    deletePost(id: String!): Post
    createComment(content: String!, postId: String!): Comment
    deleteComment(id: String!): Comment
  }
`;
