import express from 'express';
import { signup,login,logout,passwordChange } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.patch("/password",passwordChange)

export default router;