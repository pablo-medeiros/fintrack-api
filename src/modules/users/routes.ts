import { Router } from "express";

import registerController from "./controllers/register.controller";

export const AuthRouter = Router();
  
AuthRouter.post("/register", registerController);