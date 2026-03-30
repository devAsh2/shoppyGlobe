import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    addedAt: { type: Date, default: Date.now }
});

export const Cart = mongoose.model('Cart', cartSchema);