import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
   user_alias: {type: String, required: true, trim: true,},
   user_firstname: {type: String, required: true,},
   user_lastname: {type: String, required: true, },
   user_email: {type: String, required: true, unique: true,},
   user_password: {type: String, required: true,},
   user_phone: {type: String, required: true,},
   user_address: {type: String, required: true,},
   user_city: {type: String, required: true,},
   user_country: {type: String, required: true,},
   user_roles: {type: Number, required: true, default: 0},
},
{timestamps: true,},

)

const UserModel= mongoose.model('Users', userSchema);

export default UserModel;