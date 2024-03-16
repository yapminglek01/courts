const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = async (pass) => {
    return await bcrypt.hash(pass, saltRounds)
}

const validatePassword = async (newPass, oldPass) => {
    return await bcrypt.compare(newPass, oldPass)
}


module.exports = {
    encryptPassword, validatePassword
}