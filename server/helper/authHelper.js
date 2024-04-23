const bcrypt = require("bcrypt");

//Hash function
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          reject(error);
        }
        resolve(hash);
      });
    });
  });
};

//compare || Decrypt function
exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
