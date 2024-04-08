const express = require("express");
const bodyParser =require("body-parser");

const { PORT } = require("./config/serverconfig");
const apiRoutes = require("./routes/index");
// const UserRepository = require("./repository/user-repository");
const UserService = require("./services/user-service");

const app = express();

const prepareAndStartServer = () => {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);


    const service= new UserService();
    // const newToken= await service.createToken({ email: "lakshit@admin.com", id:1});
    // console.log("new token is:", newToken);
    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxha3NoaXRAYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTcxMjU1NTI2MiwiZXhwIjoxNzEyNTU4ODYyfQ.N3Y5gpbXUiT9FgcsoSnkt57te8mNsemFrfIDl2RBELg";
    // const response=service.verifToken(token);
    // console.log(response);

    })


}

prepareAndStartServer();
