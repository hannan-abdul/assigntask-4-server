import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

export const ProductModel = model<TProduct>('product', productSchema);
