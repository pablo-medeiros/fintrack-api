import { Router } from "express";

import AuthMiddleware from "../../shared/middlewares/auth.middleware";
import CreateController from "./controllers/create.controller";
import { CreateSchema } from "./validators/create.validator";
import { validate } from "../../shared/middlewares/validate.middleware";
import { UpdateSchema } from "./validators/update.validator";
import UpdateController from "./controllers/update.controller";
import DeleteController from "./controllers/delete.controller";
import FindController from "./controllers/find.controller";
import { PaginationSchema } from "../../shared/validators/pagination.validator";
import ListController from "./controllers/list.controller";
import authorize from "../../shared/middlewares/authorize.middleware";

export const TransactionsRouter = Router();

TransactionsRouter.use(AuthMiddleware);
TransactionsRouter.post("/", validate(CreateSchema, "body"), CreateController);
TransactionsRouter.get("/:id", FindController);
TransactionsRouter.get(
  "/",
  validate(PaginationSchema, "query"),
  ListController,
);
TransactionsRouter.get(
  "/user/:id",
  authorize('ADMIN'),
  validate(PaginationSchema, "query"),
  ListController,
);
TransactionsRouter.patch(
  "/:id",
  validate(UpdateSchema, "body"),
  UpdateController,
);
TransactionsRouter.delete("/:id", DeleteController);
