import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const privateKey = 'secret-key';
  
    if (token == null) return res.status(400).send("Error! Token not find");

    jwt.verify(token, privateKey, (err, user) => {
      if (err) {
        return res.sendStatus(401)
      }
      req.user = user;
      next();
    });
  }

export default authenticateToken;