import mongoose, { Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  categoryName: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});
categorySchema.pre('save', function (next) {
  if (this.isModified('categoryName')) {
    // Replace multiple spaces with a single space
    this.categoryName = this.categoryName.replace(/\s+/g, ' ').trim();
    // Convert to uppercase
    this.categoryName = this.categoryName.toUpperCase();
  }
  next();
});
export const Category = mongoose.model<TCategory>('Category', categorySchema);
