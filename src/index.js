const express = require("express");
const app = express();

const { PORT }= require("./config/serverconfig");

const prepareAndStartServer = () => {

    app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
    })
}

prepareAndStartServer();
