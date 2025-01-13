import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.interface";

const castErrorHandler = (err: mongoose.Error.CastError) : TGenericErrorResponse =>{
    const statusCode = 400;
    const errorSources : TErrorSources = [
        {
            path: err?.path,
            message: err?.message
        }
    ]
    return {
        statusCode,
        message: "Invalid ID",
        errorSources
    }
}   


export default castErrorHandler;