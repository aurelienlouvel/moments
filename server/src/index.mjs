import { ApolloServer } from "apollo-server-koa";
import graphqlUploadKoa from "graphql-upload/graphqlUploadKoa.mjs";
import Koa from "koa";
import cors from "@koa/cors";
import serve from "koa-static";
import makeDir from "make-dir";
import { fileURLToPath } from "node:url";

import UPLOAD_DIRECTORY_URL from "./config/UPLOAD_DIRECTORY_URL.mjs";
import schema from "./schema/Schema.mjs";

async function startServer() {
  await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL));
  await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL) + "/audio");
  await makeDir(fileURLToPath(UPLOAD_DIRECTORY_URL) + "/image");

  const apolloServer = new ApolloServer({ schema });

  await apolloServer.start();

  new Koa()
    .use(cors())
    .use(serve("moments/"))
    .use(
      graphqlUploadKoa({
        maxFileSize: 10000000, // 10 MB
        maxFiles: 20,
      })
    )
    .use(apolloServer.getMiddleware())
    .listen(process.env.PORT, () => {
      console.info(`http://localhost:${process.env.PORT}`);
    });
}

startServer();
