const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email Address format"] },
    name: {type: String, required: true },
    phone: {type: Number, required: true },
    address: {type: String, required: true },
    password: {type: String, required: true, minLength: 6 },
    type: {type: String, required: true, enum: ['A','U'], default: 'U' }, // admin or user
})


/*
userSchema.pre('save', async function(next){
    const user = this;
    // Encrypt user password here
    user.password = encrypt(user.password)
    next()
})
*/

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)