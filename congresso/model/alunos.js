const database = require("./database");
const DataTypes = require("sequelize");

const aluno = database.sequelize.define("alunos", {
    nome: {
        type: DataTypes.TEXT
    },
    curso: {
        type: DataTypes.TEXT
    },
    ra: {
        type: DataTypes.NUMBER
    }
});

module.exports = aluno;