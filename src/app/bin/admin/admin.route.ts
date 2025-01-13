import { Router } from "express";
import { adminControllers } from "./admin.controller";

const router = Router();

router.get('/', adminControllers.getAllAdmins);
router.get("/:adminId", adminControllers.getSingleAdmin);
router.delete("/:adminId", adminControllers.deleteSingleAdmin);



export const adminRoutes = router;