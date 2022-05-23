const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const qrcode = require("qrcode");
const database = require("./model/database");
const port = process.env.port || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (requisicao, resposta) => {
    resposta.render("home");
});

app.post("/gerar", (requisicao, resposta) => {
    const ra = requisicao.body.ra;

    if (!ra) {
        resposta.send("[ATENÇÃO] Preencha o campo RA do aluno!");
    } else {
        database.query("SELECT * FROM alunos WHERE ra = ?", [ra], (erro, resultado) => {
            if (erro) {
                console.log(erro);
            } else {
                const aluno = resultado[0];
                console.log(aluno);
                if (aluno.inscrito === "T") {
                    const nomeAluno = aluno.nome;
                    const raAluno = aluno.ra;
                    const cursoAluno = aluno.curso;
                    const NewQRCode = {
                        code: (`${nomeAluno} ${raAluno} ${cursoAluno}`)
                    }

                    qrcode.toDataURL(NewQRCode.code, (erro, dados) => {
                        const dataCode = dados;
                        resposta.render("verificado", {code: dataCode, aluno: aluno});
                    });
                } else {
                    resposta.send("[ERRO] Aluno não inscrito no Congresso");
                }
            }
        })
    }
});

app.get("/erro", (requisicao, resposta) => {
    resposta.render("aviso");
});

app.get("/retorno", (requisicao, resposta) => {
    resposta.render("home");
});

app.get("/ler", (requisicao, resposta) => {
    resposta.render("leitor");
});

app.post("/presenca", (requisicao, resposta) => {
    database.query("INSERT INTO presenca (registro) VALUES (?)", [requisicao.body.decodificacao], (erro) => {
        if (erro) {
            console.log(erro);
        } else {
            resposta.render("leitor");
        }
    });
});

app.listen(port, () => {
    console.log("Servidor em execução...");
});