import { Router } from "express";
import {
  allSupport,
  getUserSupport,
  singleSupport,
  createSupportTicket,
  updateSupport,
  closeSupportTicket,
} from "../controller/supportController.js";
const router = Router();

router.get("/v1/getSupport", allSupport);
router.get("/v1/userSupport", getUserSupport);
router.get("/v1/getSupport/:id", singleSupport);

router.post("/v1/createSupport", createSupportTicket);

router.patch("/v1/updateSupport/:id", updateSupport);

router.patch("/v1/closeSupport/:id", closeSupportTicket);

export default router;
