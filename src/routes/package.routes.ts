import express from 'express'
import { createPackage, delPackage, getAllPackage, getById } from '../controllers/package.controller'

const router = express.Router()

router.post('/packagecreator',createPackage)
router.delete('/:id',delPackage)
router.get('/',getAllPackage)
router.get('/:id',getById)


export default router;
