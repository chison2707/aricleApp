import express from "express"
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDef";
import { resolvers } from "./resolvers/index.resolvers";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
    dotenv.config();
    database.connect();
    const app = express() as any;
    const port: number | string = process.env.PORT || 3000;

    // graphQl
    app.use("/graphql", requireAuth);

    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true,
        context: ({ req }) => {
            return { ...req };
        }
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startServer();