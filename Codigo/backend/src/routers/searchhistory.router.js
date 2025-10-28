const express = require("express");
const router = express.Router();
const searchHistoryController = require("../controllers/searchhistory.controller");
const sqFilter = require('@isatech/express-sequelize-query-filter');
const validate = require("../middlewares/validateSchemas.middleware");
const { createSearchHistorySchema, updateSearchHistorySchema } = require("../utils/validators/searchhistory.validator");


/**
 * @swagger
 * components:
 *   schemas:
 *     SearchHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         movie_id:
 *           type: integer
 *         title:
 *           type: string
 *         query:
 *           type: string
 *         year:
 *           type: integer
 *         decade:
 *           type: integer
 *         genre:
 *           type: string
 *         type:
 *           type: string
 *         searchedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /search-history:
 *   get:
 *     summary: Lista todo o histórico de buscas
 *     tags: [SearchHistory]
 *     responses:
 *       200:
 *         description: Lista de buscas ordenadas pela data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SearchHistory'
 */
router.get('/', searchHistoryController.findAll);

/**
 * @swagger
 * /search-history/{id}:
 *   get:
 *     summary: Busca um registro do histórico pelo ID
 *     tags: [SearchHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do registro
 *     responses:
 *       200:
 *         description: Registro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchHistory'
 */
router.get("/:id", searchHistoryController.findById);

/**
 * @swagger
 * /search-history:
 *   post:
 *     summary: Cria um novo registro de histórico (normalmente usado internamente)
 *     tags: [SearchHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               query:
 *                 type: string
 *               year:
 *                 type: integer
 *               decade:
 *                 type: integer
 *               genre:
 *                 type: string
 *               type:
 *                 type: string
 *             required:
 *               - movie_id
 *               - title
 *               - query
 *     responses:
 *       201:
 *         description: Registro criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchHistory'
 */
router.post('/', validate(createSearchHistorySchema), searchHistoryController.create);

/**
 * @swagger
 * /search-history/{id}:
 *   put:
 *     summary: Atualiza um registro do histórico
 *     tags: [SearchHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               query:
 *                 type: string
 *               year:
 *                 type: integer
 *               decade:
 *                 type: integer
 *               genre:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchHistory'
 */
router.put("/:id", validate(updateSearchHistorySchema), sqFilter(), searchHistoryController.update);

/**
 * @swagger
 * /search-history/{id}:
 *   delete:
 *     summary: Deleta um registro do histórico pelo ID
 *     tags: [SearchHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Registro deletado
 */
router.delete("/:id", searchHistoryController.destroy);

/**
 * @swagger
 * /search-history:
 *   delete:
 *     summary: Deleta todos os registros do histórico
 *     tags: [SearchHistory]
 *     responses:
 *       200:
 *         description: Todos os registros deletados
 */
router.delete("/", sqFilter(), searchHistoryController.destroyAll);

module.exports = router;
