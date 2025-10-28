import type { Request, Response, NextFunction } from 'express';
import sqFilter from '@isatech/express-sequelize-query-filter';

export const filterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Caso o pacote sqFilter tenha adicionado req.filter
  const filterFromLib = (req as any).filter ?? {};

  // Query params da requisição
  const filterFromQuery = req.query ?? {};

  // Unifica tudo
  (req as any).filterOptions = {
    ...filterFromLib,
    ...filterFromQuery,
  };

  next();

};