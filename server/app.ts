import express, { Express, json, urlencoded } from "express";
import { join } from "path";
import { pagesRouter } from "./routes/pages";

const app: Express = express();

app.use(express.static(join(__dirname, '../dist')));
app.use(express.static(join(__dirname, '../dist/public')));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', pagesRouter);

export { app };
