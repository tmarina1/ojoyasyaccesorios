import { Schema, model } from "mongoose";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  stock: number;
  weight: number;
  price: number;
  image: string;
}

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, requered: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const ProductModel = model<Product>("product", ProductSchema);
