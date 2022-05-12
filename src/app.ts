import { createServer } from "@graphql-yoga/node";
import express from "express";
import { ctx } from "./context";
import { typeDefs } from "./definitions";
import queries from "./queries";
import mutations from "./mutations";

export function buildApp() {
  const app = express();

  const graphQLServer = createServer({
    schema: {
      typeDefs,
      resolvers: {
        Query: {
          ...queries,
        },
        Mutation: {
          ...mutations
        },
      },
    },
    context: () => {
      return {
        prisma: ctx.prisma
      }
    },
    logging: true,
  });

  app.use("/graphql", graphQLServer);

  return app;
}
