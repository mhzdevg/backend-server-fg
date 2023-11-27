const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('addresses', AddressSchema)
