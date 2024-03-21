const bcrypt = require('bcrypt');
const path = require('path');
const validator = require('validator');
const db = require('./database.js');
const users = path.join(__dirname, '..', 'protected', 'users.json');
const hashSecret = process.env.HASH_SECRET || "default";
const saltRounds = 10;

class Register {
  static async attemptSignup(args) {
    const {username, email, password, repassword} = args;

    // check validity
    if (!validator.isAlphanumeric(username)) 
      return { success: false, message: "Invalid username. Username can only contain letters and numbers." };
    if (!validator.isLength(username, { min: 3, max: 20 })) 
      return { success: false, message: "Username must be between 3 and 20 characters long." };
    if (!validator.isEmail(email)) 
      return { success: false, message: "Invalid email address." };
    if (password !== repassword) 
      return { success: false, message: "Passwords do not match." };
    if (!Password.isPassword(password)) 
      return { success: false, message: Password.weakPasswordMessage() };

    // handle database
    if (db.find(users, username)) return { success: false, message: "Username already exists. Please choose a different one." };
    let newusr = {username, email};
    newusr.password = await bcrypt.hash(password + hashSecret, saltRounds);
    db.set(users, username, newusr);

    return { success: true, message: "User registered successfully.", username: newusr.username};
  }
  
  static async attemptLogin(args) {
    const {username, password} = args;
    
    // Check validity
    if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 3, max: 20 })) 
      return { success: false, message: "Invalid username." };
    if (!Password.isPassword(password))
      return { success: false, message: "Invalid password." };
    
    // Handle database
    const user = db.get(users, username);
    if (!user) return { success: false, message: "Incorrect username." };
    let matches = await bcrypt.compare(password + hashSecret, user.password);
    if (!matches) return { success: false, message: "Incorrect password." };

    return { success: true, message: "Login successful.", username: user.username };
  }
}

class Password {
  static isPassword(password) {
    return validator.isLength(password, { min: 6, max: 20 });
  }
  static isStrongPassword(password) {
    return validator.isStrongPassword(password);
  }
  static weakPasswordMessage() {
    return "Password must be between 6 and 20 characters long.";
  }
}

// export
module.exports = {
  signup: Register.attemptSignup,
  login: Register.attemptLogin,
};
