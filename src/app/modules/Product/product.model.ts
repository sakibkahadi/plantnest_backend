import mongoose, { Schema } from 'mongoose';
import { TProduct, TReview } from './product.interface';

const reviewSchema = new Schema<TReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required'],
  },
  comment: { type: String },
  rating: { type: Number, required: [true, 'rating is required'] },
  createdAt: { type: Date },
});

const productSchema = new Schema<TProduct>({
  productId: { type: String, require: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discount: {
    percentage: { type: Number, min: 0, max: 100 },
    validUntil: { type: Date },
  },
  stock: { type: Number, required: true, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: String },
  imageUrl: [{ type: String }],
  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  isFeatured: { type: Boolean, default: false },
});

///hook
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    // Replace multiple spaces with a single space
    this.name = this.name.replace(/\s+/g, ' ').trim();
    // Convert to uppercase
    this.name = this.name.toUpperCase();
  }
  next();
});
export const Product = mongoose.model<TProduct>('Product', productSchema);
