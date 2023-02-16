const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        max: 10000000000,
        min: 0
    },
    subtotal:{
        type: Number,
        required: true,
        max: 10000000000,
        min: 0
    },
    phone:{
        type: String,
        required: true,
        max: 10,
        min: 10
    }
});

module.exports = mongoose.model('Order', orderSchema);