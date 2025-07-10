import { delUser, getAllUser, getById, updUser } from "../controllers/user.controller"
import express from 'express'

const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getById)
router.put('/:id',updUser)
router.delete('/:id',delUser)


export default router;

