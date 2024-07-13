import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findById(_id);
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const updateProductFromDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (_id: string) => {
  const result = await ProductModel.findByIdAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  getAllProductsFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
