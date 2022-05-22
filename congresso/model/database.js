const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize("congresso", "root", "Axq76665pB22269", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("Conexão com o banco de dados estabelecida...");
}).catch(erro => {
    console.log("Erro: " + erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    DataTypes: DataTypes
}