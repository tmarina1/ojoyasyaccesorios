import { Router } from "express";
import multer from "multer";
import { Product, ProductModel } from "../models/product.model";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
  upload.single("image"),
  asyncHandler(async (req: any, res: any) => {
    const { name, brand, description, stock, weight, price } = req.body;
    const image = req.file && req.file.path;
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

router.delete(
  "/delete-product/:id",
  asyncHandler(async (req, res) => {
    try {
      await ProductModel.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(true);
    } catch {
      res.send(false);
    }
  })
);

router.patch(
  "/update-product/:id",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    try {
      await ProductModel.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.send(true);
    } catch {
      res.send(false);
    }
  })
);

export default router;
