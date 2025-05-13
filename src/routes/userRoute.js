import express from 'express'
import {postUsers,  getAllUsers, deleteUser, updateUser, getUserId, creatUser, registerUser, login } from "../controllers/userControllers.js"
import { validate } from '../middleware/validate.js'
import { createUserSchema, loginSchema, updatedUserSchema } from '../schemas/userSchemas.js'
import { authenticate } from '../middleware/authentication.js'


const router = express.Router()

router.get ('/', getAllUsers )

router.post('/', validate(createUserSchema), creatUser)


router.put('/:id',validate(updatedUserSchema), updateUser)

router.delete('/:id',  authenticate, deleteUser)

router.post('/register', registerUser)

router.post('/login', validate(loginSchema), login)

router.get('/:id', getUserId)

export default router

