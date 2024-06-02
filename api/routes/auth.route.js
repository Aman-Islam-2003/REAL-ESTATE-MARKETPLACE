import {Router} from "express";
import {signup} from '../controllers/auth.controller.js'
const router = Router();

//routes
router.post('/signup', signup)

export default router;
