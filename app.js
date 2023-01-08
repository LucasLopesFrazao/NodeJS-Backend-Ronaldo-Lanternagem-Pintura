require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//BANCO DE DADOS
const database = require("./config/db");
database.sync();

const cliente = require('./src/routes/clienteRouter')
const carro = require('./src/routes/carroRouter')
const termoQuitacao = require('./src/routes/termoQuitacaoRouter')


//SERVIDOR
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/clientes", cliente);
app.use("/carros", carro);
app.use("/termoQuitacoes", termoQuitacao);


app.listen(3333);
