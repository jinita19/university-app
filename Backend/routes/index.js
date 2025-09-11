import express from 'express';
import { countryRoutes } from './countryRoutes.js';

export const appRoutes = express.Router();

appRoutes.use('/countries', countryRoutes);
