import express from "express";
import { StudentsRoutes } from "../modules/students/student.route";
import { usersRoutes } from "../modules/users/user.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.router";
import { adminRoutes } from "../modules/admin/admin.route";
import { courseRoutes } from "../modules/course/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { productRoutes } from "../modules/products/product.routes";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: usersRoutes,
  },
  {
    path: "/students",
    route: StudentsRoutes,
  },
  {
    path: "/academic-semester",
    route: academicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: academicDepartmentRoutes
  },
  {
    path: "/faculties",
    route: FacultyRoutes
  },
  {
    path: "/admins",
    route: adminRoutes
  },
  {
    path: "/courses",
    route: courseRoutes
  },
  {
    path: "/semsterRegistration",
    route: semesterRegistrationRoutes
  },
  {
    path: "/products",
    route: productRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
