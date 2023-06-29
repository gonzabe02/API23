require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./src/db/config');


const app = express();
dbConnection();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "You are connected to the project" });
});

app.use("/api/usuarios", require("./src/routes/usuarioRoutes"));
app.use("/api/contactos", require("./src/routes/contactosRoutes"));

app.listen(process.env.PORT, () =>{
    console.log('App listening on PORT: '+process.env.PORT);
})

module.exports = app;