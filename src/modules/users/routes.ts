import { Router } from "express";

import registerController from "./controllers/register.controller";
import loginController from "./controllers/login.controller";
import refreshTokenController from "./controllers/refresh-token.controller";
import meController from "./controllers/me.controller";
import AuthMiddleware from "../../shared/middlewares/auth.middleware";

export const AuthRouter = Router();
export const UserRouter = Router();
  
AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.post("/refresh-token", refreshTokenController);
UserRouter.get("/me",AuthMiddleware, meController);