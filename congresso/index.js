const express = require("express");
const app = express();
const path = require("path");
const BodyParser = require("body-parser");
const QRCode = require("qrcode");
const alunos = require("./model/alunos");

const port = process.env.PORT || 3000;

/* Template Engine. */
app.set("view engine", "ejs");

/* Diretório estático. */
app.use(express.static(path.join(__dirname, "public")));

/* Framework body-parser = JSON. */
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

/* Rotas definidas pelo Express. */
app.get("/", (requisicao, resposta) => {
    resposta.render("home");
});

app.post("/gerar", (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const ra = requisicao.body.ra;

    if (!ra) {
        resposta.send("[ATENÇÃO] Preencha este campo!");
    } else {
        alunos.findAll({
            attributes: ["id", "nome", "ra", "curso", "inscrito"],
            where: {ra: requisicao.body.ra}
        }).then((alunos) => {
            const Aluno = alunos[0].dataValues;

            /* Verificação se o aluno é inscrito no congresso. */
            if (Aluno.inscrito === "T") {
                const NomeAluno = Aluno.nome;
                const RaAluno = Aluno.ra;
                const CursoAluno = Aluno.curso;

                const NewQRCode = {
                    code: (`${NomeAluno} ${RaAluno} ${CursoAluno}`)
                }

                QRCode.toDataURL(NewQRCode.code, (erro, dados) => {
                    const DataCode = dados;
                    resposta.render("verificado", {code: DataCode, aluno: Aluno})
                });
            } else {
                resposta.send("[ERRO] Aluno não inscrito no Congresso!");
            }
        }).catch(erro => {
            console.error(erro);
        });
    }
});

app.get("/ler", (requisicao, resposta) => {
    resposta.render("leitor");
});

/* Porta de execução do servidor Express. */
app.listen(port, () => {
    console.log("Servidor executando na porta 8080...");
});