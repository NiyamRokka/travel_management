import express from 'express';
import { Registered, Login } from '../controllers/auth.controller';


const router = express.Router()

router.post('/register',Registered)
router.post('/login',Login)
// router.get('/',Logged_In)

export default router;
