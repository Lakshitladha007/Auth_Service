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
            onsole.log("Something went wrong in repository layer, so cannot delete a user");
            throw error;
        }
    }

};

module.exports= UserRepository;

