import express from 'express';
import { ProductControllers } from './product.controller';
import { ProductValidation } from './product.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct,
);

export const ProductRoutes = router;
