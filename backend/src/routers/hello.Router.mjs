import { Router } from "express";
import { helloYoutube } from "../controllers/hello.Controller.mjs";
import { idValidator } from "../middlewares/videoMiddlewares/idValidator.mjs";

const helloRouter = Router()

helloRouter.route("/hello")
                .get(idValidator,helloYoutube)


export default helloRouter