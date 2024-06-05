import {Router} from "express";
import {signin, signup} from '../controllers/auth.controller.js'
const router = Router();

//routes
router.post('/signup', signup)
router.post('/signin', signin)

export default router;
