import { Router } from "express";
import {
  singleUsers,
  clientSignUp,
  clientLogin,
  view_alllUser,
  searchUsers,
} from "../controller/authController.js";
import { isAdmin, verifyToken } from "../middleware/JWT.js";

const router = Router();
router.get("/v1/allUser", verifyToken, isAdmin, view_alllUser);
router.get("/v1/singleUser/:id", singleUsers);
router.get("/v1/searchUsers", searchUsers);
router.post("/v1/signUp", clientSignUp);
router.post("/v1/login", clientLogin);

export default router;
