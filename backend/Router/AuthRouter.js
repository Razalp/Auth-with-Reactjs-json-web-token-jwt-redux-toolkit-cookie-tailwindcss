import express from 'express';
import { signup } from '../Controllers/AuthConteroller.js';
const router =express.Router()



router.post('/signup',signup)

export default router;