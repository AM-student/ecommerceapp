import mongoose, { Schema } from 'mongoose';

const roleSchema = mongoose.Schema ({
    role_id: { type: String, required: true },
    role: { type: String, required: true }
});

const roles = mongoose.model('Role', roleSchema);

export default roles;