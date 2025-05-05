import express from 'express'
import {postUsers,  getAllUsers, deleteUser, updateUser, getUserId } from "../controllers/userControllers.js"


const router = express.Router()

router.get ('/', getAllUsers )

// router.post('/', creatUser)

router.post('/', postUsers)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

router.get('/:id', getUserId)
export default router

