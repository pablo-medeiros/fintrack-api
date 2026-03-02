import { Router } from "express";

import registerController from "./controllers/register.controller";
import loginController from "./controllers/login.controller";
import refreshTokenController from "./controllers/refresh-token.controller";
import meController from "./controllers/me.controller";
import AuthMiddleware from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import { RegisterSchema } from "./validators/register.validator";
import { LoginSchema } from "./validators/login.validator";
import { RefreshTokenSchema } from "./validators/refresh-token.validator";
import authorize from "../../shared/middlewares/authorize.middleware";
import ListController from "../transactions/controllers/list.controller";
import { PaginationSchema } from "../../shared/validators/pagination.validator";

export const AuthRouter = Router();
export const UserRouter = Router();
  
AuthRouter.post("/register",validate(RegisterSchema, 'body'), registerController);
AuthRouter.post("/login", validate(LoginSchema,'body'), loginController);
AuthRouter.post("/refresh-token", validate(RefreshTokenSchema,'body'), refreshTokenController);
UserRouter.get("/me",AuthMiddleware, meController);
UserRouter.get("/",AuthMiddleware,authorize('ADMIN'),validate(PaginationSchema,'query'),ListController)