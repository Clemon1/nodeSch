import { Router } from "express";
import {
  createRequest,
  view_SingleRequest,
  customer_Request,
  all_Request,
  update_hardwareRequest,
} from "../controller/hardwareRequestController.js";
import { verifyToken } from "../middleware/JWT.js";
const router = Router();
// router.use(verifyToken);
router.get("/v1/viewAll", all_Request); // Admin API
router.get("/v1/client/viewAll", customer_Request); // customer Api
router.get("/v1/viewAll/:id", view_SingleRequest); // Admin and customer API
router.post("/v1/createRequest", createRequest); // Customer APi
router.patch("/v1/updateRequest/:id", update_hardwareRequest); // Admin API

export default router;
