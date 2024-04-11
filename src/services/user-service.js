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

    async signIn(email, plainPassword){
      try {
        // step1 - fetch the user using the email
        const user = await this.userRepository.getByEmail(email);
        // step2 - compare incoming  plain password with stored encrypted password
        const passwordsMatch = this.checkPassword( plainPassword, user.password);

        if(!passwordsMatch){
          console.log("Password doesn't match");
          throw { error:' Incorrect password'};
        }
        // step3- if password matches then create a JWT token and send it to the user
        const newJWT = this.createToken({ email: user.email, id: user.id});
        return newJWT;
      } catch (error) {
        console.log("Something went wrong in the signIn process");
        throw error; 
      }
    }

    async isAuthenticated(token){
      try {
        const response= this.verifToken(token); // verifyToken fxn returns an object having email, id, iat and expiry properties
        if(!response){
          throw {error:"Invalid token"};
        }
        const user= await this.userRepository.getById(response.id);
        if(!user){
          throw { error:"user does not exist with correspondng token"}
        }
        return user.id;
      } catch (error) {
        console.log("Something went wrong in auth process");
        throw error; 
      }
    } 

    async getByEmail(email){
      try {
        const user= await this.userRepository.getByEmail(email);
        return user;
      } catch (error) {
        console.log("Something went wrong in the getting user by email");
        throw error; 
      }
    }

    createToken(user){   // This fxn need not to be asynchronous // We nedd to always pass a plain Js object as 1st arguement and not a sequelize object
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