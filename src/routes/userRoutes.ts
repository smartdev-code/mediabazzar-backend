import { Router } from "express";
import {
  init,
  register,
  login,
  logout,
} from "../controllers/user/userController";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/init", userAuthMiddleware, init);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", userAuthMiddleware, logout);

export default router;
