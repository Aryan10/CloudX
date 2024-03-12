const bcrypt = require('bcrypt');
const fs = require('fs');
const usersFilePath = '../protected/users.json';
const users = JSON.parse(fs.readFileSync(usersFilePath));