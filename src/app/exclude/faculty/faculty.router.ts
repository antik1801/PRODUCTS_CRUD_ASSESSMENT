import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidations } from "./faculty.validation";
import { FacultyController } from "./faculty.controller";


const router = Router();

router.get('/', FacultyController.getAllFaculties);
router.get('/:facultyId', FacultyController.getSingleFaculty)
router.patch('/:facultyId', validateRequest(facultyValidations.updateFacultyValidationSchema), FacultyController.updateSingleFaculty)
router.delete('/:facultyId', FacultyController.deleteSingleFaculty)


export const FacultyRoutes = router;