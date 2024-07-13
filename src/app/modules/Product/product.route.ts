import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/products', ProductController.createProduct);
router.get('/product/:id', ProductController.getSingleProduct);
router.get('/allproducts', ProductController.getAllProducts);
router.put('/updateProduct/:id', ProductController.updateProduct);
router.delete('/product/:productId', ProductController.deleteProduct);

export const ProductRoutes = router;
