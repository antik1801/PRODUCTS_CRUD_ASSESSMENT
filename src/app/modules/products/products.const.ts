import { TProductsStatus } from "./products.interface";


export const productsStatus : TProductsStatus[] = ["In Stock", "Stock Out"] as const;

export const productsSearchableFields = ['category', 'name', 'offered_price'] 