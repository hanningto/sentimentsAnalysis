import { Router } from "express";
import { createUser, deleteUser, getUser } from "../controllers/users.Controllers.mjs";

const userRouter = Router()

userRouter.route('/user')
                .get(getUser)
                .post(createUser)
                .delete(deleteUser)
export default userRouter