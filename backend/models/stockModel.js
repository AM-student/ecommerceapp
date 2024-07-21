import mongoose, { Schema } from 'mongoose';

const stockSchema = mongoose.Schema({
    product_id: { type: String, required: true },
    stock_amount: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const stocks = mongoose.model('Stock', stockSchema);

export default stocks;