const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config(); // this fxn calls our 'dotenv' file

module.exports={
    PORT:process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
}