const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const reviewController = require('../controllers/review.controller');
const sqFilter = require('@isatech/express-sequelize-query-filter');
const validate = require('../middlewares/validateSchemas.middleware');
const { createMovieSchema,updateMovieSchema } = require('../utils/validators/movie.validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         imdbID:
 *           type: string
 *         title:
 *           type: string
 *         year:
 *           type: integer
 *         decade:
 *           type: integer
 *         plot:
 *           type: string
 *         genre:
 *           type: string
 *         rated:
 *           type: string
 *         runtime:
 *           type: string
 *         director:
 *           type: string
 *         actors:
 *           type: string
 *         poster:
 *           type: string
 *         imdbRating:
 *           type: number
 *         ratings:
 *           type: array
 *           items:
 *             type: object
 *         type:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /movies/search/{imdbID}/{queryTerm}:
 *   get:
 *     summary: Busca filme por IMDb ID com registro de histórico de pesquisa
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: imdbID
 *         schema:
 *           type: string
 *         required: true
 *         description: IMDb ID do filme
 *       - in: path
 *         name: queryTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de pesquisa usado pelo usuário
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Filme não encontrado
 */
router.get('/search/:imdbID/:queryTerm', movieController.getOneByImdbID);

/**
 * @swagger
 * /movies/title/{title}:
 *   get:
 *     summary: Busca filmes pelo título
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Título do filme
 *     responses:
 *       200:
 *         description: Lista de filmes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/title/:title', sqFilter(), movieController.getByTitle);

/**
 * @swagger
 * /movies/genre/{genre}:
 *   get:
 *     summary: Busca filmes por gênero
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: genre
 *         schema:
 *           type: string
 *         required: true
 *         description: Gênero do filme
 *     responses:
 *       200:
 *         description: Lista de filmes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/genre/:genre', sqFilter(), movieController.getByGenre);

/**
 * @swagger
 * /movies/year/{year}:
 *   get:
 *     summary: Busca filmes por ano
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ano do filme
 *     responses:
 *       200:
 *         description: Lista de filmes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/year/:year', sqFilter(), movieController.getByYear);

/**
 * @swagger
 * /movies/decade/{decade}:
 *   get:
 *     summary: Busca filmes por década
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: decade
 *         schema:
 *           type: integer
 *         required: true
 *         description: Década do filme
 *     responses:
 *       200:
 *         description: Lista de filmes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/decade/:decade', sqFilter(), movieController.getByDecade);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/', sqFilter(), movieController.findAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Busca filme pelo ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.get('/:id', movieController.findById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Filme criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.post('/', validate(createMovieSchema), movieController.create);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Atualiza filme
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Filme atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.put('/:id', validate(updateMovieSchema), movieController.update);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Deleta filme
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Filme deletado
 */
router.delete('/:id', movieController.destroy);

/**
 * @swagger
 * /movies/{movieId}/reviews:
 *   get:
 *     summary: Lista avaliações (reviews) de um filme
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do filme
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/:movieId/reviews', sqFilter(), reviewController.findMovieReviews);

module.exports = router;
