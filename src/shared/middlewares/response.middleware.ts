import { Request, Response, NextFunction } from 'express';

export function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const sendResponse = (statusCode: number, data: unknown) => {
    return res.status(statusCode).json({
      status: "success",
      data: data
    });
  }
  res.created = function (data) {
    return sendResponse(201, data);
  };

  res.noContent = function () {
    return sendResponse(204, null);
  };

  res.ok = function (data) {
    return sendResponse(200, data);
  };

  res.pagination = function (data, meta) {
    const totalPages = Math.ceil(meta.total / meta.limit)
    return res.status(200).json({
      status: "success",
      data: data,
      meta: {
        ...meta,
        totalPages
      }
    });
  }
  next();
}