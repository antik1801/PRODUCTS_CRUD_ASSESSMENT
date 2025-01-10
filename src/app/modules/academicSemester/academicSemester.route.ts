import express from "express";
import { academicSemesterValidation } from "./academicSemester.validation";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterControllers } from "./academicSemerster.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  academicSemesterControllers.createAcademicSemester
);
router.patch(
  "/:semesterId",
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  academicSemesterControllers.updateSingleAcademicSemester
);
router.get("/", academicSemesterControllers.getAllAcademicSemester);
router.get("/:semesterId", academicSemesterControllers.getSingleAcademicSemester);
router.delete("/:semesterId", academicSemesterControllers.deleteSingleAcademicSemester);

export const academicSemesterRoutes = router;
