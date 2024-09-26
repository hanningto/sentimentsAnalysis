import {Router} from "express"
import { getComments } from "../controllers/comments.controllers.mjs"

const commentsRouter = Router()

commentsRouter.route("/comments")
                    .get(getComments)

export default commentsRouter