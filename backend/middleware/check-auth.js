const jwt = require('jsonwebtoken')

const secret_string = 'some_very_long_secret_and_i_am_trying_to_make_it_even_longer'
// users can be string or array format
// leave empty if anyone can use it
const checkAuth = (users = undefined) =>{
  return (req, res, next) => {
    try {
      let token = req.get('authorization')
      if(token === undefined) throw new Error('Invalid method', 'test')
      token = token.split(' ')[1]
      const decoded = jwt.verify(token, secret_string);
      res.userData = decoded;
      if(users === undefined) return next(); // does not require validation
      if(users.constructor === Array) {
        if(!users.includes(decoded.type)) throw new Error('User does not have permission')
      }else {
        if(users !== decoded.type) throw new Error('User does not have permission')
      }
      next();
    } catch (error) {
      console.log(error)
      res.status(401).json({status: 401, message: "Auth failed!" , data: error.message});
    }
  }
}

const signToken = (data) => {
    return jwt.sign(JSON.parse(JSON.stringify(data)), secret_string, {
        expiresIn: 3600  //'1h'
    })
}

module.exports = {
    checkAuth,
    signToken
}