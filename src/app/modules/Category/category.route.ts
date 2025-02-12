import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();
router.post(
  '/create-category',
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategory);
export const CategoryRoutes = router;

router.patch(
  '/:id',
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);
router.delete('/:id', CategoryControllers.deleteCategory);
router.get('/:id', CategoryControllers.getSingeCategory);
