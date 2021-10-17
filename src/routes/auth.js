import { Router } from 'express';

import signUpUser from './controllers/authControllers/signUpUser';

const router = Router();

router.post('/signup', signUpUser);

export default router;
