


import {Router} from "express";
import {UserController} from '../controllers/user/user.controller.js';
import needsign from "../middleware/need-signin.middleware.js"


const router = Router();
const user = new UserController();

router.get("/user",needsign, user.infouser)

export default router