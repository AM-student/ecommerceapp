import mongoose, { Schema } from 'mongoose';

const productSchema = mongoose.Schema ({
    product_title: { type: String, required: true },
    product_category: { type: String, required: false },
    product_price: { type: Number, required: true },
    product_images: { type: Array, required: false },
    product_colors: { type: Array, required: false },
    product_sizes: { type: Array, required: false },
    product_description: { type: String, required: true },
    product_tags: { type: String, required: false },
    product_InStock: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: new Date() },
});

const products = mongoose.model('Product', productSchema);

export default products;