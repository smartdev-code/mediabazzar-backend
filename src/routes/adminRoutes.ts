import { Router } from "express";
import { register, login, logout } from "../controllers/admin/adminController";
import { adminAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", adminAuthMiddleware, logout);

export default router;
