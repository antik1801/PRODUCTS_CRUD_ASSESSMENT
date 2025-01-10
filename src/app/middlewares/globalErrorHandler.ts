/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error.interface";
import config from "../config";
import zodErrorHandler from "../errors/handleZodError";
import validationErrorHandler from "../errors/handleValidationError";
import castErrorHandler from "../errors/handleCastError";
import duplicateErrorHandler from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";


const globalErrorHandler = (err: any, req:Request, res:Response, next: NextFunction)=>{

    let statusCode = 500;
    let message = err.message || 'Something went wrong';
  
  
    let errorSources :TErrorSources =[{
      path: "",
      message: "Something went wrong"
    }] 

 
    if(err instanceof ZodError)
      {
        const simplifiedError = zodErrorHandler(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
      }
      else if(err?.name === 'ValidationError')
      {
        const simplifiedError =  validationErrorHandler(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
      }else if(err?.name === 'CastError')
      {
        const simplifiedError = castErrorHandler(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
      }else if(err?.code === 11000)
      {
        const simplifiedError = duplicateErrorHandler(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
      }else if(err instanceof AppError)
      {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
          {
            path: "",
            message: err?.message
          }
        ]
      }else if(err instanceof Error)
      {
        message = err?.message;
        errorSources = [{
          path: "",
          message: err?.message
        }]
      }




      res.status(statusCode).json({
        success: false,
        message,
        error : err,
        errorSources,
        stack: config.NODE_ENV == 'development'
      })
  
}

export default globalErrorHandler;
