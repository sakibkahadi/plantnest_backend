import httpStatus from 'http-status';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import AppError from '../../errors/AppError';
import { categorySearchableFields, match } from './category.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createCategoryIntoDB = async (payload: TCategory) => {
  const categoryName = match(payload.categoryName);

  const isCategoryExists = await Category.findOne({
    categoryName: categoryName,
  });
  if (isCategoryExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category is already Exists');
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(categorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await categoryQuery.countTotal();

  const result = await categoryQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const isCategoryExistsById = await Category.findById(id);

  const modifiedUpdatedData = payload;

  if (payload?.categoryName) {
    const categoryName = match(payload.categoryName);
    modifiedUpdatedData.categoryName = categoryName;
    const isCategoryExistsByCategoryName = await Category.findOne({
      categoryName: categoryName,
    });
    if (isCategoryExistsById && isCategoryExistsByCategoryName) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Category is Not Exists');
    }
  }

  const result = await Category.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const isCategoryExistsById = await Category.findById(id);
  if (!isCategoryExistsById) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is not found');
  }
  const result = await Category.findByIdAndUpdate(
    id,
    { isActive: false, isDeleted: true },
    { new: true },
  );

  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const isCategoryExists = await Category.findById(id);
  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is not  exist');
  }

  return isCategoryExists;
};
export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
  getSingleCategoryFromDB,
};
