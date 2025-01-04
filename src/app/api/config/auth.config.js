import jwt from "jsonwebtoken";

module.exports = {
    secret: "bezkoder-secret-key",
    verifyToken : (token,secret) => {
      try {
        return jwt.verify(token, secret);
      } catch (error) {
        throw new Error('Invalid or expired token');
      }
    },
    generateToken : (email,role,secret) => {
      const payload = {
        role: role,
        email: user.email,
      };
    
      return jwt.sign(payload, secret, { expiresIn: 86400 }); // 24h
    }
  };
  
