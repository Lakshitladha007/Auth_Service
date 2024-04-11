const express = require("express");
const bodyParser =require("body-parser");

const { PORT, DB_SYNC } = require("./config/serverconfig");
const apiRoutes = require("./routes/index");
const db=require("./models/index");
const {User, Role}=require("./models/index");

const app = express();

const prepareAndStartServer = () => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);
    if(process.env.DB_SYNC){
        db.sequelize.sync({alter:true});
    }
    const u1=await User.findByPk(5);
    console.log(u1);
    const r1= await Role.findByPk(2);
    console.log(r1);
    u1.addRole(r1);
    })

}

prepareAndStartServer();
