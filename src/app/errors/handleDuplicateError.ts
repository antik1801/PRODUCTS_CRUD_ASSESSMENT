import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.interface";

const duplicateErrorHandler = (err: mongoose.Error.CastError) : TGenericErrorResponse =>{
    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];
    const errorSources: TErrorSources = [
        {
            path: err?.path,
            message: `${extractedMessage} Id is already exists`
        }
    ]
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorSources
    }
} 


export default duplicateErrorHandler;