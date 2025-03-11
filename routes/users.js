import express from 'express';
var router = express.Router();

import { getUsers } from '../controllers/getUsers.js';
import { createUser } from '../controllers/createUser.js';
import { updateUser } from '../controllers/updateUser.js';
import { userLogin } from '../controllers/userLogin.js';
import authToken from '../util/authToken.js';
import { fetchAllFacts, fetchRandomFacts, fetchFactById, createFact } from '../controllers/facts.js';

router.all('/');
router.get('/user', authToken, getUsers);
router.post('/user/signup', createUser);
router.post('/user/auth', userLogin);
router.put('/user/:id', authToken, updateUser)

router.get('/facts', authToken, fetchAllFacts);
router.get('/facts/random', authToken, fetchRandomFacts);
router.get('/facts/:id', authToken, fetchFactById);
router.post('/facts', authToken, createFact)

export default router;
