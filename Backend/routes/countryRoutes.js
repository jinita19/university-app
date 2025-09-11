import express from 'express';
import { getCountries } from '../controllers/countryController.js';

export const countryRoutes = express.Router();

countryRoutes.get('/', getCountries);