import express from 'express'
import { createPackage, delPackage, getAllPackage, getById, updPackage } from '../controllers/package.controller'

const router = express.Router()

router.post('/packagecreator',createPackage)
router.delete('/:id',delPackage)
router.put('/:id',updPackage)
router.get('/',getAllPackage)
router.get('/:id',getById)


export default router;
