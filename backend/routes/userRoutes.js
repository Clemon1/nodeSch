import getUsers from '../controller/userController.js';
import { Router } from 'express';
const router = Router();

router.route('/').get(getUsers);
export default router;
