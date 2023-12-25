import express from 'express';

import {text} from '../Controllers/UserController.js'
const router=express.Router();
router.get('/',text)
export default router;