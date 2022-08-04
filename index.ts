import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./src/Schemas";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3333, () => console.log("Running..."));
