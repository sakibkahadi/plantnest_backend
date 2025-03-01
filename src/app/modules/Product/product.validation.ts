import { z } from 'zod';
import { Product } from './product.model';

export const reviewValidationSchema = z.object({
  user: z.string({ required_error: 'user is required' }),
  comment: z.string().optional(),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  createdAt: z.string().datetime().optional(),
});

const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'product name is required')
      .refine(async (value) => {
        const existingProduct = await Product.findOne({
          name: value.replace(/\s+/g, ' ').trim().toUpperCase(),
        });
        return !existingProduct;
      }, 'Product name already exists'),
    description: z.string().nonempty('Description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    discount: z
      .object({
        percentage: z.number().min(0).max(100).optional(),
        validUntil: z.string().datetime().optional(),
      })
      .optional(),
    stock: z.number().min(0, 'Stock must be a positive number'),
    category: z.string().nonempty('Category is required'),
    brand: z.string().optional(),
    imageUrl: z.array(z.string().url('Invalid image URL')).optional(),
    reviews: z.array(reviewValidationSchema).optional(),
    averageRating: z.number().min(0).max(5).optional(),
    isFeatured: z.boolean().optional(),
  }),
});

// Update Product Validation Schema (Allows Partial Updates)
export const updateProductValidationSchema = z.object({
  body: createProductValidationSchema.shape.body.partial(),
});
export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
