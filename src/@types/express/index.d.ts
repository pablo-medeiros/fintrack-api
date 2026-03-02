import 'express';
import { AppError } from '../../shared/middlewares/error.middleware';

declare module 'express-serve-static-core' {
  interface Response {
    created: (data: unknown) => Response;
    noContent: () => Response;
    ok: (data: unknown) => Response;
    pagination: (data: unknown, meta: { total: number; page: number; limit: number }) => Response;
  }
}