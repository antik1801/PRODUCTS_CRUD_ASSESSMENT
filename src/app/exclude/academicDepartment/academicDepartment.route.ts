
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post("/create-academic-department", validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartmentControllers.createAcademicDepartment)
router.get("/", academicDepartmentControllers.getAllAcademicDepartment);
router.get("/:id", academicDepartmentControllers.getSingleAcademicDepartment);
router.patch("/:id", validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartmentControllers.updateAcademicDepartment);
router.delete("/:id", academicDepartmentControllers.deleteAcademicDepartment)


export const academicDepartmentRoutes = router;