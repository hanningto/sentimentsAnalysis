import { Router } from "express";
import { dbCheck, idValidator } from "../middlewares/videoMiddlewares/idValidator.mjs";
import { analysis, analysisInfo, deleteVideo } from "../controllers/video.Controllers.mjs";

const videoRouter = Router()

videoRouter.route('/videos')
                        .get(analysisInfo)

videoRouter.route('/analysis')
                        .post( idValidator, dbCheck,analysis)

videoRouter.route('/videos:id')
                .delete(deleteVideo)


export default videoRouter