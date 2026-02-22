import { Router } from "express";

import AuthMiddleware from "../../shared/middlewares/auth.middleware";
import CreateController from "./controllers/create.controller";

export const TransactionsRouter = Router();
  
TransactionsRouter.use(AuthMiddleware);
TransactionsRouter.post("/", CreateController);