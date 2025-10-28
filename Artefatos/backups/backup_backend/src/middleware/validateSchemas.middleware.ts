import { ZodSchema } from 'zod';
import type { NextFunction, Request, Response } from 'express';


interface ValidationError {
  [key: string]: string;
}

export default function validateSchema(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      const issues = result.error.issues;
      const errors: ValidationError = {}; 
      
      for (const issue of issues) {
        const field = issue.path[0];
        const message = issue.message;

        if (typeof field === 'string') {
          if (!errors[field]) {
            errors[field] = message;
          }
        }
      }
      return res.status(400).json({
        status: 400,
        message: 'Parâmetros inválidos',
        errors,
      });
    }
    next();
  };
}