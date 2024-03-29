import dotenv from "dotenv";
import express, { Express } from "express";
import { API_FACTS_PATH } from "./routes/constants";
import { router as factsRouter } from "./routes/facts";

dotenv.config();

const app: Express = express();

/* Use this built-in middleware, so that request bodies are parsed as JSON. */
app.use(express.json());

/* List all the routes to be used by the API. */
app.use(API_FACTS_PATH, factsRouter);

/* Start the server process. */
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
