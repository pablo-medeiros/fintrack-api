import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";

export default async function CreateController(req: AuthenticatedRequest, res: Response) {
  return res.json({});
}