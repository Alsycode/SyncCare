import express from 'express';
import { login, checkCurrentUser,registerAdmin } from '../controllers/Auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register',registerAdmin);
// router.get('/me',  checkCurrentUser);

export default router;
