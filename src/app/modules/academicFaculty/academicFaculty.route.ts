import express from "express"
import { academicFacultyValidation } from "./academicFaculty.validation";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyController } from "./academicFaculty.controller";
const router = express.Router();

router.post("/create-academic-faculty", validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), academicFacultyController.createAcademicFaculty);
router.get("/", academicFacultyController.getAllAcademicFaculty);
router.get("/:facultyId", academicFacultyController.getSingleAcademicFaculty);
router.patch("/:facultyId", validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFaculty);
router.delete("/:facultyId", academicFacultyController.deleteAcademicFaculty);


export const academicFacultyRoutes = router;