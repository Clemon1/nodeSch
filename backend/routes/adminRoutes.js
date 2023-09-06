import { Router } from "express";
import {
  adminSignUp,
  adminLogin,
  getUser,
  view_alllUser,
} from "../controller/authController.js";
import { isAdmin, verifyToken } from "../middleware/JWT.js";

const router = Router();

router.get("/v1/admin/user", verifyToken, getUser);
router.post("/v1/admin/signUp", adminSignUp);
router.post("/v1/admin/login", adminLogin);

export default router;
