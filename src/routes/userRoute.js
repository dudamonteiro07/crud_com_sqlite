import express from 'express'
import {postUsers,  getAllUsers, deleteUser, updateUser, getUserId, creatUser } from "../controllers/userControllers.js"
import { validate } from '../middleware/validate.js'
import { createUserSchema, updatedUserSchema } from '../schemas/userSchemas.js'


const router = express.Router()

router.get ('/', getAllUsers )

// router.post('/', creatUser)

router.post('/', validate(createUserSchema), creatUser)

router.delete('/:id', deleteUser)

router.put('/:id',validate(updatedUserSchema), updateUser)

router.get('/:id', getUserId)
export default router

