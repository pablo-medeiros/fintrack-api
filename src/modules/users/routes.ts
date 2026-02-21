import { Router } from "express";

import registerController from "./controllers/register.controller";
import loginController from "./controllers/login.controller";

export const AuthRouter = Router();
  
AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);