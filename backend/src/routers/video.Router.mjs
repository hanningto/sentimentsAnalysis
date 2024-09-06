import { Router } from "express";
import { dbCheck, idValidator } from "../middlewares/videoMiddlewares/idValidator.mjs";
import { analysis, analysisInfo } from "../controllers/video.Controllers.mjs";

const videoRouter = Router()

videoRouter.route('/videos')
                        .post(idValidator,analysisInfo)
videoRouter.route('/analysis')
                        .post( idValidator, dbCheck,analysis)


export default videoRouter