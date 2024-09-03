import { Router } from "express";
import { helloYoutube } from "../controllers/hello.Controller.mjs";

const helloRouter = Router()

helloRouter.route("/hello")
                .get(helloYoutube)


export default helloRouter