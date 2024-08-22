import { Router } from "express";
import { register, login, logout } from "../controllers/user/userController";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", userAuthMiddleware, logout);

export default router;
