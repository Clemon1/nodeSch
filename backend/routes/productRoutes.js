import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import { Router } from "express";
// import { verifyToken } from '../middleware/JWT.js';

const router = Router();

router
  .route("/")
  .post(createProduct) //verify if user is logged in,then verify if he has the authorization then pass request to createProduct function
  .get(getProducts); //verify if user is logged in,then verify if he has the authorization then pass request to get all products function
router
  .route("/:id")
  .get(getProduct) //verify if user is logged in,then verify if he has the authorization then pass request to get function
  .patch(updateProduct) //verify if user is logged in,then verify if he has the authorization then pass request to update function
  .delete(deleteProduct); //verify if user is logged in,then verify if he has the authorization then pass request to delete function

export default router;
