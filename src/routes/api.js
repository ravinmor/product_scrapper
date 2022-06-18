import { Router } from "express";
import puppeteerScrapperController from "../controllers/puppeteerScrapper.js";
import regexScrapper from "../controllers/regexScrapper.js";

const routes = Router();

routes.get("/", (req, res) => {res.send("Hello world")});
routes.post("/getPetLoveProduct", puppeteerScrapperController.getPetLoveProductInfo)
routes.post("/getPetLoveProductWithRegex", regexScrapper.getPetLoveProductInfo)

export { routes }