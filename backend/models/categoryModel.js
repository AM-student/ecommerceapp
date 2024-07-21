import mongoose, { Schema } from 'mongoose';

const categorySchema = mongoose.Schema({
    category_name: { type: String, required: true },
    category_description: {type: String, required: false },
    createdAt: { type: Date, default: new Date() },
});

const categories = mongoose.model('Category', categorySchema);

export default categories;