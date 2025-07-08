import { getAllUser, getById, updUser } from "../controllers/user.controller"
import express from 'express'

const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getById)
router.put('/:id',updUser)


export default router;

