import mongoose from "mongoose"
import { TProducts } from "./products.interface";
import { generateProductCode } from "./products.utils";
import { Products } from "./products.model";
import QueryBuilder from "../../builder/QueryBuilder";
// import { productsSearchableFields } from "./products.const";


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

const getAllProductsFromDB = async (query: Record<string, unknown>) =>{

    console.log("services ", query);
    let productQuery = Products.find();
    
    const queryBuilder = new QueryBuilder(productQuery, query);

    productQuery = queryBuilder.search(['name']).filter().sort().paginate().fields().modelQuery;

    const result = await productQuery.exec();

    return result;

}



export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB
}