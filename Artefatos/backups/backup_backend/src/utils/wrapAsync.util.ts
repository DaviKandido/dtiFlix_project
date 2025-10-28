import type { NextFunction, Request, Response } from 'express';

function wrapAsync(fn: (req: Request, res: Response) => Promise<any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res).catch(next);
  };
}
export default wrapAsync;