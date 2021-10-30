import { Router } from 'express';

import signUpUser from './controllers/authControllers/signUpUser';
import signInUser from './controllers/authControllers/signInUser';
const router = Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);

export default router;
