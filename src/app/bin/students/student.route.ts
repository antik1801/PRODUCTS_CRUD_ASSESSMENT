import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidationSchema } from "./student.zod.validation";

const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.delete("/:studentId", StudentController.deleteStudent);

router.get("/:studentId", StudentController.getSingleStudent);

router.patch("/:studentId", validateRequest(studentValidationSchema.updateStudentValidationSchema), StudentController.updateStudent);

export const StudentsRoutes = router;
