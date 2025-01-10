/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./app/routes";
import { StudentsRoutes } from "./app/modules/students/student.route";
import { usersRoutes } from "./app/modules/users/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFound";

// express
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

// we need to create a global error handler

app.use(globalErrorHandler); // using global error handlers

app.get("/", (req: Request, res: Response, next?: NextFunction) => {
  res.send("Hello World!");
});


app.use(notFoundRoute);

export default app;
