import {
  createSubscription,
  getSubscription,
  getAllSubscriptions,
  getAllUserSubsriptions,
  getNoOfUsersSubcribesToProduct,
  updateSubscription,
  deleteSubscription,
} from "../controller/subscriptionController.js";
import { Router } from "express";
import { verifyToken, isAdmin } from "../middleware/JWT.js";
const router = Router();

router
  .route("/")
  .post(createSubscription)
  .get(getAllSubscriptions)
  .patch(updateSubscription);
router.route("/getNoSub").get(getNoOfUsersSubcribesToProduct);
router.route("/sub").get(getAllUserSubsriptions);
router.route("/:id").get(getSubscription).delete(deleteSubscription);

export default router;
