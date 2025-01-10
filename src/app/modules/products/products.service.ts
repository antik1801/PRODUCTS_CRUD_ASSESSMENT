import mongoose from "mongoose"
import { TProducts } from "./products.interface";
import { generateProductCode } from "./products.utils";
import { Products } from "./products.model";


const createProductIntoDB = async (payload: TProducts) =>{
    

    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        // generate a product code
        const productCode = await generateProductCode(payload);
        const productData = { ...payload, productCode };

        const result = await Products.create([productData], {session});

        await session.commitTransaction();
        await session.endSession();
        return result;
    }
    catch(err)
    {
        await session.abortTransaction();
        await session.endSession();
        throw new Error("Failed to create product");
    }
}


export const productServices = {
    createProductIntoDB
}