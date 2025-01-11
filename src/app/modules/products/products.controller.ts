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

const getAllProducts = catchAsync(async (req: Request, res: Response) =>{
  console.log("controllers = ", req.query);
  const result = await productServices.getAllProductsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products fetched successfully",
    data: result
  })
})

export const productControllers = {
  createProduct,
  getAllProducts
};
