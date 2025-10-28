const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const sqFilter = require('@isatech/express-sequelize-query-filter');
const validate = require('../middlewares/validateSchemas.middleware');
const { updateReviewSchema,createReviewSchema } = require('../utils/validators/review.validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         movie_id:
 *           type: integer
 *         comment:
 *           type: string
 *         rating:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 */

/**
 * @swagger
 * /reviews/top-rated:
 *   get:
 *     summary: Retorna as reviews mais bem avaliadas
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista de reviews ordenadas por nota
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/top-rated', sqFilter(), reviewController.findTopRated);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Lista todas as reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista de reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', sqFilter(), reviewController.findAll);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Busca review pelo ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da review
 *     responses:
 *       200:
 *         description: Review encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.get('/:id', reviewController.findById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cria uma nova review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *             required:
 *               - movie_id
 *               - rating
 *     responses:
 *       201:
 *         description: Review criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post('/', validate(createReviewSchema), reviewController.create);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Atualiza uma review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Review atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.put('/:id', validate(updateReviewSchema), reviewController.update);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Deleta uma review pelo ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Review deletada
 */
router.delete('/:id', reviewController.destroy);

/**
 * @swagger
 * /reviews:
 *   delete:
 *     summary: Deleta todas as reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Todas as reviews deletadas
 */
router.delete('/', sqFilter(), reviewController.destroyAll);

module.exports = router;
