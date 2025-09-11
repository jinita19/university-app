import express from 'express';
import { getUniversities } from '../controllers/universitiesController.js';

export const universityRoutes = express.Router();

universityRoutes.get('/', getUniversities);