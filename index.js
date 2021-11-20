import conectarBD from "./db/db.js";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { tipos } from "./graphql/types.js";
import { resolvers } from "./graphql/resolvers.js"


dotenv.config();

const server = new ApolloServer({
    typeDefs: tipos,
    resolvers: resolvers,
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async ()=>{
    await conectarBD();
    await server.start();

    //Agregar un middleware
    server.applyMiddleware({ app });

    console.log("El servidor se encuentra listo");
});

