import express from 'express';
const userRoutes = express.Router();
import { getAllUsers, getUserByID, createUser, updateUser, deleteUser, loginUser, testC } from '../controllers/userController.js';
import { isAdmin, requireSignIn } from '../middlewares/userMiddleware.js';

userRoutes.get('/users',requireSignIn, isAdmin, getAllUsers);
userRoutes.get('/users/:id', requireSignIn, isAdmin, getUserByID);
userRoutes.post('/register', createUser);
userRoutes.post('/login', loginUser);
userRoutes.put('/users/:id',requireSignIn, updateUser);
userRoutes.delete('/users/:id', requireSignIn, isAdmin, deleteUser);

userRoutes.get(`/test`, requireSignIn, isAdmin, testC)

export default userRoutes;