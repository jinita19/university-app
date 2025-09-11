import express from 'express';
import { countryRoutes } from './countryRoutes.js';
import { universityRoutes } from './universityRoutes.js';
import { favouriteUniRoutes } from './favouriteUniRoutes.js';

export const appRoutes = express.Router();

appRoutes.use('/countries', countryRoutes);
appRoutes.use('/universities', universityRoutes);
appRoutes.use('/favourites', favouriteUniRoutes);

