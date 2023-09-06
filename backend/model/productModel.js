import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    specification: {
      miningHashrate: {
        type: String,
      },
      lifeSpan: {
        type: String,
      },
      powerConsumption: {
        type: Number,
      },
      fee: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
