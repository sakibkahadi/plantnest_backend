import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { generateProductId, match } from './product.utils';
import httpStatus from 'http-status';
const createProductIntoDB = async (payload: TProduct) => {
  const productName = match(payload.name);

  const isProductExists = await Product.findOne({
    name: productName,
  });
  if (isProductExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is already Exists');
  }

  payload.productId = await generateProductId();

  const result = await Product.create(payload);
  return result;
};
export const ProductServices = { createProductIntoDB };
