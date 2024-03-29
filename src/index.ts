import dotenv from 'dotenv';
import express, { Express } from 'express';
import session from 'express-session';

import { API_AUTH_PATH, API_FACTS_PATH } from './routes/constants';
import { router as factsRouter } from './routes/facts';
import { router as authRouter } from './routes/auth';

dotenv.config();

if (!process.env.SESSION_SECRET) {
  throw new Error('Could not start the server. Please check you environment variables!');
}

const app: Express = express();

/* Use this built-in middleware, so that request bodies are parsed as JSON. */
app.use(express.json());

/* Set the session configuration. */
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 24 * 60 * 1000
  }
}));

/* List all the routes to be used by the API. */
app.use(API_AUTH_PATH, authRouter);
app.use(API_FACTS_PATH, factsRouter);

/* Start the server process. */
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
