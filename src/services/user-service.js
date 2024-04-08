const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const UserRepository =require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverconfig");

class UserService{

    constructor(){
        this.userRepository= new UserRepository();
    }

    async create(data){
       try {
         const user= await this.userRepository.create(data);
         return user;
       } catch (error) {
         console.log("Something went wrong in service layer");
         throw error;
       } 
    }

    async destroy(userId){
        try {
            const response= await this.userRepository.destroy(userId);
            return response;
        } catch (error) {
         console.log("Something went wrong in service layer");
         throw error; 
        }
    }


    createToken(user){   // This fxn need not to be asynchronous
        try {
          const result = jwt.sign( user, JWT_KEY, { expiresIn: '1h'});
          return result; 
        } catch (error) {
          console.log("Something went wrong in token creation");
          throw error;
        }
    }

    verifToken(token){
      try {
        const response = jwt.verify(token, JWT_KEY);
        return response;
      } catch (error) {
        console.log("Something went wrong in token validation", error);
        throw error;
      }
    }

    checkPassword( userInputPlainPassword, encryptedPassword){
      try {
        return bcrypt.compareSync( userInputPlainPassword, encryptedPassword);
      } catch (error) {
        console.log("Something went wrong in password comparison", error);
        throw error;
      }
    }
}

module.exports= UserService;