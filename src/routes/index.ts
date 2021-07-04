import { Router } from 'express';
import ProductRouter from './Job';

const router = Router();

/**
 * Registering /product sub-routes
 */
router.use('/job', ProductRouter);

/**
 * Exporting registered routes
 */
export default router;
