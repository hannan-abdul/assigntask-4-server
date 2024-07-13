/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = req.body;
  const result = await ProductServices.createProductIntoDB(product);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product created successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  if (!result) {
    throw new Error('This Product is not found');
  }

  res.status(200).json({
    success: true,
    message: 'single product retrieved successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB();
  res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    date: result,
  });
});

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = req.body;
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'product data is required',
      });
    }
    const result = await ProductServices.updateProductFromDB(id, product);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'product updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    if (result._id.toString() === productId) {
      try {
        await result.deleteOne();
        res.status(200).json({
          success: true,
          message: 'Product deleted successfully',
          data: result,
        });
      } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message || 'something went wrong',
          error: err,
        });
      }
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const ProductController = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
