import express from 'express';
import { addFavourite, deleteFavourite, getFavourites } from '../controllers/favouritesController.js';

export const favouriteUniRoutes = express.Router();

favouriteUniRoutes.get('/', getFavourites);
favouriteUniRoutes.post('/', addFavourite);
favouriteUniRoutes.delete('/', deleteFavourite);

