const mysql = require("mysql");

const presenca = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Axq76665pB22269",
    port: 3306,
    database: "congresso",
    multipleStatements: true
});

presenca.connect((erro) => {
    if (erro) {
        throw erro;
    } else {
        console.log("Essa conexão é mais rápida");
    }
});

global.presenca = presenca;

module.exports = presenca;