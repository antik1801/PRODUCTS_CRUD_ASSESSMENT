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

const updateProduct = catchAsync( async (req: Request, res:Response) =>{
  const {productId} = req.params;
  const productData = req.body;
  const result = await productServices.updateProductIntoDB(productId, productData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result
  })
} )

const deleteProduct = catchAsync(async (req:Request, res: Response) =>{
    const {productId} = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await productServices.deleteProductFromDB(productId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Product deleted successfully",
      data: null
    })
})


export const productControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
