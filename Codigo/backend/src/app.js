const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const ApiError = require('./utils/errorHandler.util');
const app = express();
const multer = require('multer');

// Configuração de CORS - permite somente o frontend acesse a API
app.use(
  cors({
    origin: process.env.Frontend_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(multer().none());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString()} | Requisição: ${req.method} ${req.url}`);
  next();
});


app.use('/api/favorites', require ('./routers/favorite.router'));
app.use('/api/movies', require ('./routers/movie.router'));
app.use('/api/reviews', require ('./routers/review.router'));
app.use('/api/search-history', require ('./routers/searchhistory.router'));
app.use('/api/stats', require ('./routers/stats.router'));

const swagger = require('./docs/swagger.js');

swagger(app);


// Catch-all para rotas não encontradas → envia para o middleware de erro
app.use((req, res, next) => {
  const error = new ApiError(404, 'Page not found!', 
    {
      path: req.url,
      message: 'Page not found!',
    },
  );
  next(error); // passa para o middleware de erro
});

// Middleware de erro que trata 404 e demais erros
app.use((err, req, res, next) => {
  const statusCode = err.code || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Something went wrong!',
    errors: err.errors || null,
  });
});



module.exports = app;