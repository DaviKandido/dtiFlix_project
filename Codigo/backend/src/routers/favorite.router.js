const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const sqFilter = require('@isatech/express-sequelize-query-filter');
const validate = require('../middlewares/validateSchemas.middleware');
const { createFavoriteSchema } = require('../utils/validators/favorite.validator');


/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do favorito
 *         movie_id:
 *           type: integer
 *           description: ID do filme favoritado
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
 * /favorites/search/{imdbID}:
 *   get:
 *     summary: Busca um favorito pelo IMDb ID do filme
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: imdbID
 *         schema:
 *           type: string
 *         required: true
 *         description: IMDb ID do filme
 *     responses:
 *       200:
 *         description: Favorito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Favorito não encontrado
 */
router.get('/search/:imdbID', favoriteController.getOneByImdbID);

/**
 * @swagger
 * /favorites/last-date:
 *   get:
 *     summary: Retorna favoritos ordenados pela data de criação
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Lista de favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 */
router.get('/last-date', sqFilter(), favoriteController.findLastDate);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Lista todos os favoritos
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Lista de favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 */
router.get('/', sqFilter(), favoriteController.findAll);

/**
 * @swagger
 * /favorites/{id}:
 *   get:
 *     summary: Busca um favorito pelo ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do favorito
 *     responses:
 *       200:
 *         description: Favorito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 */
router.get('/:id', favoriteController.findById);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Cria um favorito
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do filme
 *             required:
 *               - id
 *     responses:
 *       201:
 *         description: Favorito criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 */
router.post('/', validate(createFavoriteSchema), favoriteController.create);

/**
 * @swagger
 * /favorites/{id}:
 *   put:
 *     summary: Atualiza um favorito
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do favorito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Favorito atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 */
router.put('/:id', sqFilter(), favoriteController.update);

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Deleta um favorito pelo ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do favorito
 *     responses:
 *       200:
 *         description: Favorito deletado
 */
router.delete('/:id', favoriteController.destroy);

/**
 * @swagger
 * /favorites:
 *   delete:
 *     summary: Deleta todos os favoritos
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Todos os favoritos deletados
 */
router.delete('/', sqFilter(), favoriteController.destroyAll);

module.exports = router;
