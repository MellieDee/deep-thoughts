const jwt = require('jsonwebtoken');

const secret = 'mysecretshhhhh';
const expiration = '2h';



module.exports = {

  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    //Users with an invalid token should still be able to request and see all thoughts so wrap in try catch
    try {
      // decode and attach user data to request object
      // If secret on jwt.verify() doesn't match  secret used with jwt.sign() object won't be decoded. 
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return updated request object
    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
}

