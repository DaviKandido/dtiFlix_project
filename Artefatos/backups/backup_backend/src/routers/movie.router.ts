import express from "express";
const router = express.Router();
import movieController from "../controllers/movie.controller.ts";
import {filterMiddleware} from "../middleware/parse-filter.middleware.ts";
import sqFilter from '@isatech/express-sequelize-query-filter';

router.get("/", movieController.findAll);
router.get("/title/:title", filterMiddleware, movieController.getByTitle);
router.get("/genre/:genre", filterMiddleware, movieController.getByGenre);
router.get("/year/:year", filterMiddleware, movieController.getByYear);
router.get("/decade/:decade", filterMiddleware, movieController.getByDecade);
router.get("/:id", movieController.findById);
router.post("/", movieController.create);
router.put("/:id", filterMiddleware, movieController.update);
router.delete("/:id", movieController.destroy);
router.delete("/", filterMiddleware, movieController.destroyAll);

export default router;