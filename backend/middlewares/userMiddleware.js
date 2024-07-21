import JWT from 'jsonwebtoken'
import UserModel from '../models/userModel.js'
import { Error } from 'mongoose'

export const requireSignIn = async (req, res, next) => {
try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }    
}

export const isAdmin = async (req, res, next) =>{
    try {
        const user = await UserModel.findById(req.user._id)
        if (user.user_roles !== 1) {
        return res.status(401).send({ 
            success: false,
            message: 'Unauthorized'
        })}
        else {
        next()
        }

    } catch (error) {
       console.log(error)
       res.status(401).send({
        success: false,
        error: error,
        message: 'Unauthorized'
    })}
}