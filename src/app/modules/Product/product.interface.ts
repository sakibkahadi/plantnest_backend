import { Types } from 'mongoose';

export type TReview = {
  user: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
};
export type TProduct = {
  productId: string;
  name: string;
  description: string;
  price: number;
  discount?: {
    percentage: number;
    validUntil: Date;
  };
  stock: number;
  category: Types.ObjectId;
  brand?: string;
  imageUrl?: string[];
  reviews?: TReview[];
  averageRating: number;
  isFeatured: boolean;
};
