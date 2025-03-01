import { Product } from './product.model';

export const match = (str: string) => str.replace(/\s+/g, '').toUpperCase();

export const productSearchableFields = ['name', 'category'];

export const findLastProductId = async () => {
  const lastProduct = await Product.findOne().sort({ productId: -1 }).lean();

  return lastProduct?.productId ?? undefined;
};

export const generateProductId = async () => {
  let currentID = (0).toString();

  const lastProductId = await findLastProductId();
  //   console.log(lastProductId);
  if (lastProductId) {
    currentID = lastProductId.substring(2);
  }
  let incrementId = (Number(currentID) + 1).toString().padStart(7, '0');
  incrementId = `P-${incrementId}`;
  return incrementId;
};
