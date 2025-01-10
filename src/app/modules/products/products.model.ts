import { model, Schema } from "mongoose";
import { TProducts } from "./products.interface";
import { productsStatus } from "./products.const";

const productsSchema = new Schema<TProducts>({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    discount: {
        type: String,
        default: "0"
    },
    image: {
        type: String,
        required: [true, "Product image is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    status: {
        type: String,
        enum: {
            values: productsStatus,
            message:
            "{VALUE} is invalid product status , ['In Stock' || 'Stock Out'] is required",
        },
        required: [true, "Product status is required, ['In Stock' || 'Stock Out'] is required"]
    },
    productCode:{
        type: String,
        default: null
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

export const Products = model<TProducts>("Products", productsSchema);