import { Router } from "express";
import { Product, ProductModel } from "../models/product.model";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.send(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    res.send(product);
  })
);

router.post(
  "/create-product",
  asyncHandler(async (req: any, res: any) => {
    const { name, brand, description, stock, weight, price, image } = req.body;
    const product_exist = await ProductModel.findOne({ name });
    if (product_exist) {
      res.send("Producto existe actualmente");
      return;
    }

    const newProduct: Product = {
      id: "",
      name,
      brand,
      description,
      stock,
      weight,
      price,
      image,
    };
    await ProductModel.create(newProduct);
  })
);

export default router;
