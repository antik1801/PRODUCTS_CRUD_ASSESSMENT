import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { productServices } from "./products.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await productServices.createProductIntoDB(productData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product created successfully",
    data: result
  })
});

export const productControllers = {
  createProduct,
};
