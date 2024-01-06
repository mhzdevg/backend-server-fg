const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionEmailSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('subscriptionEmails', SubscriptionEmailSchema)