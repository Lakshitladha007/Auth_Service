const dotenv = require("dotenv");

dotenv.config(); // this fxn calls our 'dotenv' file

module.exports={
    PORT:process.env.PORT
}