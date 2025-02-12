import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CategoryServices } from './category.service';
import { RequestHandler } from 'express';
const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is Created Successfully',
    data: result,
  });
});
const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories  are Retrieve Successfully',
    meta: result?.meta,
    data: result?.result,
  });
});
const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryServices.updateCategoryIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated Successfully',
    data: result,
  });
});
const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryServices.deleteCategoryFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is deleted Successfully',
    data: result,
  });
});
const getSingeCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CategoryServices.getSingleCategoryFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is retrieve Successfully',
    data: result,
  });
});
export const CategoryControllers = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getSingeCategory,
};
