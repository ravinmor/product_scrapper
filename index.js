import express from "express";
import { routes } from "./src/routes/api.js";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log("> Server is running on port 3333"));
