const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swagger = (app) => {
  const option = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'dtiflix-backend',
        description:
          'Full stack application built with Next.js + TypeScript and Sequelize, integrating the OMDb API to search movies, manage favorites, write reviews, and display personalized statistics in a dashboard. Includes search history, average ratings, favorite genres/decades, and a responsive UI.',
        version: '1.0.0',
        license: {
          name: 'ISC',
        },
        swaggerJSDoc: '3.0.0',
        jsonPath: 'http://localhost:5000/api/docs-swagger',
        termsOfService: 'http://localhost:5000/api/docs-swagger',
        contact: {
          name: 'Davi Cândido',
          email: 'davicandidopucminas@gmail.com',
          phone: '+55 (31) 97306-7259',
        },
      },
      servers: [
        {
          url: 'http://localhost:5000/api/',
          description: 'Ambiente de desenvolvimento',
        },
        {
          url: 'http://localhost:5000/api/',
          description: 'Ambiente de produção',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [path.join(__dirname, '../routers/*.js')],
  };

  const specs = swaggerJSDoc(option);

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/api/docs-swagger', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

};

module.exports = swagger;
