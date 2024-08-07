//2024_06_11
const express = require("express");
const app = express();
const mysql = require("mysql2");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;

const db = {
  host: "clibot.linceonline.com.br",
  database: "clibot_banco",
  user: "clibot_user",
  password: "*6k+QQ(%Z4Tr",
  port: 3306
};

const execSQLQuery = (sqlQry, id, res) => {
  const connection = mysql.createConnection(db);

  connection.query(sqlQry, id, (error, results, fields) => {
    
    //verifica se há erro e envia uma resposta de erro se houver, se não, haverá resposta normal
    if (error) res.json(error);
    else res.json(results);

    connection.end();
    console.log("Executou: execSQLQuery");
  });
};

app.post("/ler/mensagem", (req, res) => {
  if (!req.body.data.key.fromMe) {
    
  
  console.log(req.body);
  console.log(req.body.data.pushName, req.body.data.message.conversation); 
  console.log(req.body.data.remoteJid);
  const myHeaders = new Headers();
myHeaders.append("apikey", "qmd6bj4bhjdgq755uj9o3");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "number": req.body.data.key.remoteJid.split('@')[0],
  "textMessage": {
    "text": "Olá " + req.body.data.pushName + "\nSou o Clibot, vou te atender\nVocê enviou esta mensagem " + req.body.data.message.conversation
  }
 
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://192.168.2.140:8080/message/sendText/clibot", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

});

//CREATE/INSERT

app.post("/cadastro/paciente", (req, res) => {
  console.log("Testado");
  const id = [req.body.cpf, req.body.fk_plano_saude_id_plano_saude, req.body.nome, req.body.telefone, req.body.email, req.body.endereco];
  execSQLQuery("INSERT INTO paciente VALUES (?,?,?,?,?,?)", id, res);
  console.log("Ok");
  const myHeaders = new Headers();
  myHeaders.append("apikey", "qmd6bj4bhjdgq755uj9o3");
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "number": req.body.telefone,
    "textMessage": {
      "text": "Olá " + req.body.nome + "\nSou o Clibot, vou te atender\nVocê foi cadastrado!"
    }
   
  })
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://192.168.2.140:8080/message/sendText/clibot", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  
});

app.post("/cadastro/plano_saude", (req, res) => {
  console.log("Testado");
  const id = [req.body.nome, req.body.tipo_plano, req.body.operadora];
  execSQLQuery("INSERT INTO plano_saude VALUES (null,?,?,?)", id, res);
});

app.post("/cadastro/profissional", (req, res) => {
  console.log("Testado");
  const id = [req.body.cpf_profissional_de_saude, req.body.nome, req.body.area_atuacao, req.body.senha, req.body.telefone];
  execSQLQuery("INSERT INTO profissional VALUES (?,?,?,?,?)", id, res);
});

app.post("/cadastro/estabelecimento", (req, res) => {
  console.log("Testado");
  const id = [req.body.telefone, req.body.bairro, req.body.rua, req.body.cidade, req.body.horario_de_funcionamento_inicio, 
              req.body.horario_de_funcionamento_fim, req.body.nome, req.body.descricao, req.body.tipo, req.body.token];
  execSQLQuery("INSERT INTO estabelecimento VALUES (null,?,?,?,?,?,?,?,?,?,?)", id, res);
});

app.post("/cadastro/agenda", (req, res) => {
  console.log("Testado");
  const id = [req.body.id_agenda, req.body.horario_inicio, req.body.horario_fim, req.body.intervalo, req.body.dia_semana];
  execSQLQuery("INSERT INTO agenda VALUES (null,?,?,?,?)", id, res);
});

app.post("/cadastro/agendamento", (req, res) => {
  console.log("Testado");
  const id = [req.body.id_agendamento, req.body.fk_horario_id_Agenda, req.body.fk_agendamento_id_paciente, req.body.data, req.body.hora, req.body.observacao];
  execSQLQuery("INSERT INTO agendamento VALUES (null,?,?,?,?,?)", id, res);
});

app.post("/cadastro/estabelecimento_profissional", (req, res) => {
  console.log("Testado");
  const id = [req.body.fk_estabelecimento_id_Estabelecimento, req.body.fk_profissional_cpf_profissional_de_saude];
  execSQLQuery("INSERT INTO estabelecimento_profissional VALUES (?,?)", id, res);
});

app.post("/cadastro/plano_saude_profissional", (req, res) => {
  console.log("Testado");
  const id = [req.body.fk_plano_saude_id_plano_saude, req.body.fk_profissional_cpf_profissional_de_saude];
  execSQLQuery("INSERT INTO plano_saude_profissional VALUES (?,?)", id, res);
});

//SELECT

app.get("/ver/paciente", (req, res) => {
  const id = [];
  execSQLQuery("select * from paciente", id, res);
});

app.get("/ver/plano_saude", (req, res) => {
  const id = [];
  execSQLQuery("select * from plano_saude", id, res);
});

app.get("/ver/profissional", (req, res) => {
  const id = [];
  execSQLQuery("select * from profissional", id, res);
});

app.get("/ver/estabelecimento", (req, res) => {
  const id = [];
  execSQLQuery("select * from estabelecimento", id, res);
});

app.get("/ver/agenda", (req, res) => {
  const id = [];
  execSQLQuery("select * from agenda", id, res);
});

app.get("/ver/agendamento", (req, res) => {
  const id = [];
  execSQLQuery("select * from agendamento", id, res);
});

app.get("/ver/estabelecimento_profissional", (req, res) => {
  const id = [];
  execSQLQuery("select * from estabelecimento_profissional", id, res);
});

app.get("/ver/plano_saude_profissional", (req, res) => {
  const id = [];
  execSQLQuery("select * from plano_saude_profissional", id, res);
});


//UPDATE

//Modelo:
app.put("/update/:id", (req, res) => {
  const id = [req.body.usu_email, req.body.usu_nome, req.body.usu_senha, req.params.id];
  execSQLQuery(
    "UPDATE usuario SET usu_email=?,usu_nome=?,usu_senha=? WHERE usu_id=?",
    id,
    res
  );
});
//

//Paciente
app.put("/atualizar/paciente/:id", (req, res) => {
  const id = [req.body.fk_plano_saude_id_plano_saude, req.body.nome, req.body.telefone, req.body.email, req.body.endereco, req.params.id];
  const query = "UPDATE paciente SET fk_plano_saude_id_plano_saude=? nome=?, telefone=?, email=?, endereco=? WHERE cpf=?";

  execSQLQuery(
    query,
    id,
    res
  );
});


//

/*
app.put("/atualizar/paciente/:id", (req, res) => {
  const { fk_plano_saude_id_plano_saude, nome, telefone, email, endereco } = req.body;
  const { id } = req.params;

  const params = [
    fk_plano_saude_id_plano_saude,
    nome,
    telefone,
    email,
    endereco,
    id  // Considerando que 'id' aqui se refere ao cpf
  ];

  const query = "UPDATE paciente SET fk_plano_saude_id_plano_saude=?, nome=?, telefone=?, email=?, endereco=? WHERE cpf=?";

  execSQLQuery(query, params, res);
});
*/


//
/*
app.put("/atualizar/paciente2", (req, res) => {
  const values = [
    req.body.fk_plano_saude_id_plano_saude,
    req.body.nome,
    req.body.telefone,
    req.body.email,
    req.body.endereco,
    req.body.cpf
  ];
  
  execSQLQuery(
    "UPDATE paciente SET fk_plano_saude_id_plano_saude=?, nome=?, telefone=?, email=?, endereco=? WHERE cpf=?",
    values,
    res
  );
});
*/

//Plano_Saude
app.put("/atualizar/plano_saude/:id", (req, res) => {
  const id = [req.body.nome, req.body.tipo_plano, req.body.operadora, req.params.id];
  execSQLQuery(
    "UPDATE plano_saude SET nome=?, tipo_plano=?, operadora=? WHERE id_plano_saude=?",
    id,
    res
  );
});

//Estabelecimento
app.put("/atualizar/estabelecimento/:id", (req, res) => {
  const id = [req.body.telefone, req.body.bairro, req.body.rua, req.body.cidade, req.body.horario_de_funcionamento_inicio, 
              req.body.horario_de_funcionamento_fim, req.body.nome, req.body.descricao, req.body.tipo, req.body.token, req.params.id];
  execSQLQuery(
    "UPDATE estabelecimento SET telefone=?, bairro=?, rua=?, cidade=?, horario_de_funcionamento_inicio=?, horario_de_funcionamento_fim=?, nome=?, descricao=?, tipo=?, token=? WHERE id_Estabelecimento=?",
    id,
    res
  );
});

//Profissional
app.put("/atualizar/profissional/:id", (req, res) => {
  const id = [req.body.nome, req.body.area_atuacao, req.body.senha, req.body.telefone, req.params.id];
  execSQLQuery(
    "UPDATE profissional SET nome=?, area_atuacao=?, senha=?, telefone=? WHERE cpf_profissional_de_saude=?",
    id,
    res
  );
});

//Agendamento
app.put("/atualizar/agendamento/:id", (req, res) => {
  const id = [req.body.fk_horario_id_Agenda, req.body.fk_agendamento_id_paciente, req.body.data, req.body.hora, req.body.observacao, req.params.id];
  execSQLQuery(
    "UPDATE agendamento SET fk_horario_id_Agenda=?, fk_agendamento_id_paciente=?, data=?, hora=?, observacao=? WHERE id_agendamento=?",
    id,
    res
  );
});

//Agenda
app.put("/atualizar/agenda/:id", (req, res) => {
  const id = [req.body.horario_inicio, req.body.horario_fim, req.body.intervalo, req.body.dia_semana, req.params.id];
  execSQLQuery(
    "UPDATE agenda SET horario_inicio=?, horario_fim=?, intervalo=?, dia_semana=? WHERE id_agenda=?",
    id,
    res
  );
});

//Plano_Saude_Profissional
app.put("/atualizar/plano_saude_profissional/:fk_plano_saude_id_plano_saude_old/:fk_profissional_cpf_profissional_de_saude_old", (req, res) => {
  const id = [req.body.fk_plano_saude_id_plano_saude, req.body.fk_profissional_cpf_profissional_de_saude, req.params.fk_plano_saude_id_plano_saude_old, req.params.fk_profissional_cpf_profissional_de_saude_old];
  execSQLQuery(
    "UPDATE plano_saude_profissional SET fk_plano_saude_id_plano_saude=?, fk_profissional_cpf_profissional_de_saude=? WHERE fk_plano_saude_id_plano_saude=? AND fk_profissional_cpf_profissional_de_saude=?",
    id,
    res
  );
});

//Estabelecimento_Profissional
app.put("/atualizar/estabelecimento_profissional/:fk_estabelecimento_id_Estabelecimento_old/:fk_profissional_cpf_profissional_de_saude_old", (req, res) => {
  const id = [req.body.fk_estabelecimento_id_Estabelecimento, req.body.fk_profissional_cpf_profissional_de_saude, req.params.fk_estabelecimento_id_Estabelecimento_old, req.params.fk_profissional_cpf_profissional_de_saude_old];
  execSQLQuery(
    "UPDATE estabelecimento_profissional SET fk_estabelecimento_id_Estabelecimento=?, fk_profissional_cpf_profissional_de_saude=? WHERE fk_estabelecimento_id_Estabelecimento=? AND fk_profissional_cpf_profissional_de_saude=?",
    id,
    res
  );
});

//DELETE

//Modelo:
app.delete("/delete/agenda/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM agenda WHERE id_agenda=?", id, res);
});

app.delete("/delete/agendamento/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM agendamento WHERE id_agendamento=?", id, res);
});

app.delete("/delete/establecimento/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM estabelecimento WHERE id_Estabelecimento=?", id, res);
});

app.delete("/delete/establecimento_profissional/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM estabelecimento_profissional WHERE fk_estabelecimento_id_Estabelecimento=?", id, res);
});

app.delete("/delete/paciente/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM paciente WHERE cpf=?", id, res);
});

app.delete("/delete/plano_saude/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM plano_saude WHERE id_plano_saude=?", id, res);
});

app.delete("/delete/plano_saude_profissional/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM plano_saude_profissional WHERE fk_plano_saude_id_plano_saude=?", id, res);
});

app.delete("/delete/profissional", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM profissional WHERE cpf_profissional_de_saude=?", id, res);
});

app.listen(port, () => {
    console.log(`App escutando a porta: ${port} `)
})

//
