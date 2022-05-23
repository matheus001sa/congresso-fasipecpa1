const mysql = require("mysql");

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Axq76665pB22269",
    port: 3306,
    database: "congresso",
    multipleStatements: true
});

database.connect((erro) => {
    if (erro) {
        throw erro;
    } else {
        console.log("Conexão com o banco estabelecida...");
    }
});

global.database = database;
module.exports = database;