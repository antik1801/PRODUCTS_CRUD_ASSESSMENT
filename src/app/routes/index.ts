import express from "express";
import { productRoutes } from "../modules/products/product.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/products",
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
