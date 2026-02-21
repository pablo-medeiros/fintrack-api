import { Application } from "express";
import { AuthRouter } from "./modules/users/routes";
export default function setupRoutes(app: Application) {
  app.use("/api/auth", AuthRouter);
}