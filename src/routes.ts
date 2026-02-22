import { Application } from "express";
import { AuthRouter, UserRouter } from "./modules/users/routes";
import { TransactionsRouter } from "./modules/transactions/routes";
export default function setupRoutes(app: Application) {
  app.use("/api/auth", AuthRouter);
  app.use("/api/users", UserRouter);
  app.use("/api/transactions", TransactionsRouter);
}