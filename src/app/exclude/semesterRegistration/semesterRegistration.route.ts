import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { semesterRegistrationValidation } from "./semesterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";


const router = Router();

router.post("/create-semester-registration", validateRequest(semesterRegistrationValidation.createSemesterRegistrationValidationSchema), semesterRegistrationController.createSemesterRegistration)

router.get("/", semesterRegistrationController.getAllSemesterRegistration);
router.get("/:semesterRegistrationId", semesterRegistrationController.getSingleSemesterRegistration);
router.patch("/:semesterRegistrationId" , validateRequest(semesterRegistrationValidation.updateSemesterRegistrationValidationSchema) , semesterRegistrationController.updateSemesterRegistration) 
export const semesterRegistrationRoutes = router;