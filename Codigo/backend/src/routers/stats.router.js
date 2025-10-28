const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const sqFilter = require('@isatech/express-sequelize-query-filter');

/**
 * @swagger
 * components:
 *   schemas:
 *     StatsCount:
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *     StatsGroup:
 *       type: object
 *       properties:
 *         genre:
 *           type: string
 *         type:
 *           type: string
 *         decade:
 *           type: integer
 *         year:
 *           type: integer
 *         count:
 *           type: integer
 *     StatsAverage:
 *       type: object
 *       properties:
 *         media:
 *           type: number
 */

/**
 * @swagger
 * /stats/count:
 *   get:
 *     summary: Retorna a contagem total de registros de busca
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Contagem total
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatsCount'
 */
router.get('/count', sqFilter(), statsController.count);

/**
 * @swagger
 * /stats/count-types:
 *   get:
 *     summary: Contagem de registros por tipo
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Contagem por tipo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatsGroup'
 */
router.get('/count-types', sqFilter(), statsController.countTypes);

/**
 * @swagger
 * /stats/count-genrer:
 *   get:
 *     summary: Contagem de registros por gênero
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Contagem por gênero
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatsGroup'
 */
router.get('/count-genrer', sqFilter(), statsController.countGenrers);

/**
 * @swagger
 * /stats/favorite-decade:
 *   get:
 *     summary: Contagem de favoritos por década
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Favoritos agrupados por década
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatsGroup'
 */
router.get('/favorite-decade', sqFilter(), statsController.favoritesDecades);

/**
 * @swagger
 * /stats/review-media:
 *   get:
 *     summary: Média das avaliações (ratings)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Média das avaliações
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatsAverage'
 */
router.get('/review-media', sqFilter(), statsController.reviewMedia);

/**
 * @swagger
 * /stats/year-search:
 *   get:
 *     summary: Contagem de buscas por ano
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Buscas agrupadas por ano
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatsGroup'
 */
router.get('/year-search', sqFilter(), statsController.yearsSearchs);

module.exports = router;
