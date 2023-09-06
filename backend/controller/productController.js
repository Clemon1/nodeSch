import mongoose from "mongoose";
import Product from "../model/productModel.js";
// create an asynce function to create products
export const createProduct = async (req, res) => {
  try {
    //create and organized product object accprding to product schema
    const product = {
      name: req.body.name,
      specification: {
        miningHashrate: req.body.miningHashrate,
        lifeSpan: req.body.lifeSpan,
        powerConsumption: req.body.powerConsumption,
        fee: req.body.fee,
      },
    };
    // create product and await results
    const newProduct = await Product.create(product);
    //respond with result
    res.status(200).json(newProduct);
  } catch (err) {
    //if error exist catch error and respond with error message
    res.status(400).json({ message: err?.message });
  }
};
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "invalid params" });
    }
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(403).json(err?.message);
  }
};
export const getProducts = async (req, res) => {
  try {
    const product = await Product.aggregate([
      {
        $match: {},
      },
    ]);
    res.status(200).json(product);
  } catch (err) {
    res.status(403).json(err?.message);
  }
};
export const updateProduct = async (req, res) => {
  //logic to update a single product
  try {
    //destructure id from req params object
    const id = req.params.id;
    //verify if and id was sent with the req
    if (!id) {
      res.status(400).json({
        message: "please send the id of the product you want to update",
      });
    }

    //find product and update using data from req body
    const update = await Product.findByIdAndUpdate(id, req.body, { new: true });
    //respond with update
    res.status(200).json(update);
  } catch (err) {
    //catch ny error and respond with error mmessage
    res.status(400).json(err?.message);
  }
};

export const deleteProduct = async (req, res) => {
  //logic to delete product
  try {
    //destructure id from req params object
    const { id } = req.params;
    //verify if and id was sent with the req
    if (!id) {
      res.status(400).json({
        message: "please send the id of the product you want to delete",
      });
    }
    //verify if product exist or not
    if (!(await Product.findById(id))) {
      res.status(400).json({
        message: "the product you are trying to delete does not exist",
      });
    }
    await Product.findByIdAndDelete(id);
    //respond with sucessful delete
    res.status(200);
  } catch (err) {
    //catch ny error and respond with error mmessage
    res.status(400).json(err?.message);
  }
};
