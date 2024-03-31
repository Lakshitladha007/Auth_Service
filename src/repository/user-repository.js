const { User }= require("../models/index");

class UserRepository{

    async create(data){
        try {
            const user= await User.create({
                email: data.email,
                password: data.password
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer, so cannot create a user");
            throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in repository layer, so cannot delete a user");
            throw error;
        }
    }

    async getById(userId){
        try {
           const user = await User.findByPk(userId, { // We don't want all columns associated with particular "user"
             attributes: [ 'email', 'id']             // We want only particular columns, so use attributes.
           }); 
           return user;                             
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

};

module.exports= UserRepository;

