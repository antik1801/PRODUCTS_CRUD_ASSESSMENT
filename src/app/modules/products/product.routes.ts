import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import { productsValidationSchema } from "./products.validation";

const router = express.Router();

router.post("/create-product", validateRequest(productsValidationSchema.createProductValidationSchema), )


export const productRoutes = router;