const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = async (pass) => {
    return await bcrypt.hash(pass, saltRounds)
}

const validatePassword = async (newPass, oldPass) => {
    return await bcrypt.compare(newPass, oldPass)
}

const randomHasher = async () => {
    return await bcrypt.hash(Date.now().toString(), saltRounds)
}


module.exports = {
    encryptPassword, validatePassword, randomHasher
}