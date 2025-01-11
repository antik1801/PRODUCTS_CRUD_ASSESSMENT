import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import { productsValidationSchema } from "./products.validation";
import { productControllers } from "./products.controller";

const router = express.Router();

router.post("/create-product", validateRequest(productsValidationSchema.createProductValidationSchema), productControllers.createProduct)

router.get("/", productControllers.getAllProducts);

export const productRoutes = router;