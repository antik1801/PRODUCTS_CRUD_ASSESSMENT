
export type TProductsStatus = "Stock Out" | "In Stock"

export type TProducts = {
    name: string;
    description: string;
    price: number;
    discount: string;
    image: string;
    status: TProductsStatus;
    productCode?: string | null;
    is_deleted?: boolean;
}

