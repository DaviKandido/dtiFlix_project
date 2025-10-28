import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import type { Request, Response, NextFunction} from 'express';
import cors from 'cors';


import ApiError from './utils/errorHandler.util.ts';
const app = express();

app.use(
  cors({
    origin: process.env.Frontend_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toLocaleString()} | Requisição: ${req.method} ${req.url}`);
  next();
});

import movieRoutes from './routers/movie.router.ts';


app.use('/api/movies', movieRoutes);



//swagger(app);

// Catch-all para rotas não encontradas → envia para o middleware de erro
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError( 404, 'Page not found!', 
    {
      path: req.url,
      message: 'Page not found!',
    },
  );
  next(error); // passa para o middleware de erro
});

// Middleware de erro que trata 404 e demais erros
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  res.status(statusCode).json({
    status: err.statusCode || 500,
    message: err.message || 'Something went wrong!',
    errors: err.errors || null,
  });
});


export default app;