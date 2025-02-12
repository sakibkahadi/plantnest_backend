import { z } from 'zod';
import { Category } from './category.model';

const createCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string()
      .min(1, 'Category name is required')
      .refine(async (value) => {
        const existingCategory = await Category.findOne({
          categoryName: value.replace(/\s+/g, ' ').trim().toUpperCase(),
        });
        return !existingCategory;
      }, 'Category name already exists'),
    description: z.string().min(1, 'Description is required'),
    isActive: z.boolean().optional().default(true),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string()
      .min(1, 'Category name is required')
      .refine(async (value) => {
        const existingCategory = await Category.findOne({
          categoryName: value.replace(/\s+/g, ' ').trim().toUpperCase(),
        });
        return !existingCategory;
      }, 'Category name already exists')
      .optional(),
    description: z.string().min(1, 'Description is required').optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
