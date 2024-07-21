const userController = () => {}
import { hashPassword, comparePassword } from '../helpers/userHelper.js';
import UserModel from '../models/userModel.js';
import JWT from 'jsonwebtoken'

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserByID = async (req, res) => {
    try {
        let id = req.params.id;
        await UserModel.findById(id, (err, data) => {
            if (err) return res.json({ message: 'No user with that id.' });
            res.send(data);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const {user_alias, user_firstname, user_lastname, user_email, user_password, user_phone ,user_address, user_city, user_country} = req.body
        if(!user_alias){
            return res.send({error:'al is required'})
        }
        if(!user_firstname){
            return res.send({error:'fn is required'})
        }
        if(!user_lastname){
            return res.send({error:'ln is required'})
        }
        if(!user_email){
            return res.send({error:'em is required'})
        }
        if(!user_password){
            return res.send({error:'pw is required'})
        }
        if(!user_phone){
            return res.send({error:'ph is required'})
        }
        if(!user_address){
            return res.send({error:'add is required'})
        }
        if(!user_city){
            return res.send({error:'ct is required'})
        }
        if(!user_country){
            return res.send({error:'cr is required'})
        }
      const exisitingUser = await UserModel.findOne({ user_email });
      //exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: true,
          message: "user already exists",
        });
      }
      const exisitingAlias = await UserModel.findOne({ user_alias });
      if (exisitingAlias) {
        return res.status(200).send({
          success: true,
          message: "alias already exists",
        });
      }
      //register user
      const hashedPassword = await hashPassword(user_password);
      //save
      const user = await new UserModel({user_alias, user_firstname, user_lastname, user_email, user_password:hashedPassword, user_address, user_phone, user_city, user_country}).save();
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in registration",
        error,
      });
    }
};
  
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message:'Invalid Credentials',
        });
      }
      const user = await UserModel.findOne({user_email: email});
      if (!user) {
        return res.status(404).send({
          success: false,
          message:'Invalid CredentialsE',
        });
      }
      const match = await comparePassword(password, user.user_password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message:'Invalid CredentialsP',
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      res.status(200).json({ 
        success: true, 
        message:'login valid', 
        user:{alias: user.user_alias, email: user.user_email}, 
        token });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
};
  
const testC = (req, res) => {
  res.send('protected route')
}

const updateUser = async (req, res) => {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    if (!id) {
        return res.status(404).send('No user with that id.');
    }

    if (user) {
        user.user_alias = req.body.user_alias,
        user.user_firstname = req.body.user_firstname,
        user.user_lastname = req.body.user_lastname,
        user.user_email = req.body.user_email,
        user.user_password = req.body.user_password,
        user.user_phone = req.body.user_password,
        user.user_address = req.body.user_address,
        user.user_city = req.body.user_city,
        user.user_country = req.body.country,
        user.user_roles = req.body.user_roles

        if (updatedPost) {
            return res.status(200).send({ msg: 'UserModel Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating user' });
        }
    }
}


const deleteUser = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No user with that id.');
    }
    const deletedUser = await UserModel.findByIdAndRemove(id);

    res.json({ message: 'UserModel deleted successfully', post: deletedUser });
}

export { getAllUsers, getUserByID, createUser, updateUser, deleteUser, loginUser, testC };