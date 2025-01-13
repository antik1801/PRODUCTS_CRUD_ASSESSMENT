import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidationSchema } from "./course.validation";
import { coursesController } from "./course.controller";

const router = Router();

router.post("/create-course", validateRequest(courseValidationSchema.createCourseValidationSchema), coursesController.createCourse);
router.get('/', coursesController.getAllCourses);
router.get('/:courseId', coursesController.getSingleCourse);
router.patch('/:courseId',validateRequest(courseValidationSchema.updateCourseValidationSchema), coursesController.updateSingleCourse)
router.delete('/:courseId', coursesController.deleteSingleCourse)
router.put("/:courseId/assign-faculties", validateRequest(courseValidationSchema.facultiesWithCourseValidationSchema), coursesController.assignFacultiesWithCourse)
router.delete("/:courseId/remove-faculties", coursesController.removeFacultiesWithCourse)
router.get("/course-faculties", coursesController.getAllCourseFaculties);

export const courseRoutes = router;