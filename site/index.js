const couchdb = require('couchdb-request')('http://localhost:5984');
const util = require('util');
const couchGet = util.promisify(couchdb.get);
const couchPut = util.promisify(couchdb.put);
const couchSave = util.promisify(couchdb.save);
const couchDelete = util.promisify(couchdb.del);
//const nano = require('nano')('http://localhost:5984');
//const cradle = require('cradle');
//console.log("cradle " + Object.getOwnPropertyNames(cradle));
//const connection = new(cradle.Connection)();
//const fs = require('fs');
//const readFile = util.promisify(fs.readFile);
const express = require('express');
const app = express();
//const fbe = funcoesBackEnd = require(__dirname + '/public/javascript/funcoesBackEnd');
const bodyParser = require('body-parser');

// usa a pasta public para disponibilizar arquivos estáticos
app.use(express.static('site/public'));
// usa o JSONParser do body-parser
const JSONParser = bodyParser.json();

// usa pug como motor de renderização de templates
app.set('view engine', 'pug');
// informa o caminho das views para o pug
app.set('views', __dirname + '/templates');

// roteia o index.html
app.get(/\/$|\/(index(.html)?)$/, (req, res)=>{
//   let arquivo = await readFile("site/index.html", "utf8");
//   console.log(arquivo);
   res.sendFile(__dirname + "/index.html");
});

// roteia a paginaPrincipal.html
app.get('/paginaPrincipal.html', (req, res)=>{
   res.render("paginaPrincipal");
});

// roteia a loja.html
app.get('/loja.html', (req, res)=>{
   res.sendFile(__dirname + "/loja.html");
});

// roteia o servicoTodos.html
app.get('/servicosTodos.html', (req, res)=>{console.log("entrou em serviços");
   res.sendFile(__dirname + "/servicosTodos.html");
});

// roteia o petsTodos.html
app.get('/petsTodos.html', (req, res)=>{
   res.sendFile(__dirname + "/petsTodos.html");
});

// roteia o blog.html
app.get('/blog.html', (req, res)=>{
   res.sendFile(__dirname + "/blog.html");
});

// roteia o login.html
app.get('/login.html', (req, res)=>{console.log(req.body);
   res.sendFile(__dirname + "/login.html");
});

// roteia o loginCliente.html
app.get('/loginCliente.html', (req, res)=>{console.log(req.body);
   res.sendFile(__dirname + "/loginCliente.html");
});

// roteia o loginAdm.html
app.get('/loginAdm.html', (req, res)=>{console.log(req.body);
   res.sendFile(__dirname + "/loginAdm.html");
});

// roteia o navCimaPadrao.html
app.get('/navCimaPadrao.html', (req, res)=>{console.log(req.body);
   res.sendFile(__dirname + "/navCimaPadrao.html");
});

// roteia o autenticar_no_banco
app.post('/autenticar_no_banco', JSONParser, async (req, res)=>{
   couchdb.database("clientes");
   let resposta = (await couchGet("/" + req.body.login)).body;

   if(resposta.senha == req.body.senha){
      res.render("navCima", {nome: resposta.nome, chave: resposta.login, cliente: true});
   }else{
      couchdb.database("adms");
      resposta = (await couchGet("/" + req.body.login)).body;
      if(resposta.senha == req.body.senha){
         res.render("navCima", {nome: resposta.nome, chave: resposta.login, cliente: false});

      }else res.send("");
   }
});

// roteia o cadastroCliente.html
app.post('/cadastroCliente.html', JSONParser, async (req, res)=>{
   couchdb.database('clientes');
   const cliente = (await couchGet(req.body.chave)).body;

   if(cliente){
      res.render("cadastroCliente", {c: cliente});
   }
   else{
      res.send("Erro, usuário não encontrado.");
   }
});

// roteia o cadastroAdm.html
app.post('/cadastroAdm.html', JSONParser, async (req, res)=>{
   couchdb.database('adms');
   const adm = (await couchGet(req.body.chave2)).body;

   if(adm){
      res.render("cadastroAdm", {a: adm});
   }
   else{
      res.send("Erro, usuário não encontrado.");
   }
});

// roteia o produtos/ID_PRODUTO/foto
app.get(/produtos\/\d*\/foto/, async (req, res)=>{
//   console.log(Object.getOwnPropertyNames(req));
//   console.log(req.url);
   console.log(req.query.doc + " " + req.query.image);
   couchdb.database('produtos');
//   res.send(await couchGet(req.url));
//   switch(req.url)
//console.log(req.url + " vai buscar produto " + req.url.slice(10,));
   console.log();
   console.log(Object.getOwnPropertyNames((await couchGet(req.url.slice(10,))).toJSON));
   (await couchGet(req.url.slice(10,))).pipe(res)
});

// roteia o loja ou loja_home
app.get('/loja(_home)?', async (req, res)=>{
//   couchdb
//   .database('produtos')
//   .get('_all_docs')
//   .on('error', err => console.log(err))
//   .on('response', result => console.log(result))
   let response = "";
   couchdb.database('produtos');
   let produtos = (await couchGet('_all_docs')).body.rows;
   if(req.url == "/loja_home") produtos = produtos.slice(0, 3);
   const lista = [];
   for(let i in produtos){
      try{
         let produto = (await couchGet(produtos[i].key)).body;
         if(produto._id){
            lista[i] = {
               chave: produto._id,
               descricao: produto.nome + " " + produto.marca
            };
         }
      } catch (exception){
         console.log(exception);
      }
   }
   res.render('produtoLoja', {produtos: lista});
//   res.send(response);
//   .pipe(res)
//   .pipe(async res => {console.log("começou a função pipe");
//      var response = "";
//      if(res.total_rows > 0){
//         for(let i = 0; i < res.total_rows; i++){
//            pagina += await buscarProduto(res.rows[i].key);
//         }
//      }console.log("terminou a função pipe");
//      return response;})
});

// roteia o servicosTodos ou servicosTodos_home
app.get('/servicosTodos(_home)?', async (req, res)=>{
   let response = "";
   couchdb.database('servicos');
   let servicos = (await couchGet('_all_docs')).body.rows;
   if(req.url == "/servicosTodos_home") servicos = servicos.slice(0, 3);
   const lista = []
   for(let i in servicos){
      try{
         let servico = (await couchGet(servicos[i].key)).body;
         if(servico._id){
            let des = servico.nome
            if(servico.marca) des += " " + servico.marca;
            lista[i] = {
               chave: servico._id,
               descricao: des
            };
         }
      } catch (exception){
         console.log(exception);
      }
   }
   res.render('servicoLoja', {servicos: lista});
});

// roteia o pets_loja ou pets_loja_home
app.get('/pets_loja(_home)?', async (req, res)=>{
   let response = "";
   couchdb.database('pets_loja');
   let pets = (await couchGet('_all_docs')).body.rows;
   if(req.url == "/pets_loja_home") pets = pets.slice(0, 3);
   const lista = [];
   for(let i in pets){
      try{
         let pet = (await couchGet(pets[i].key)).body;
         if(pet._id){
            lista[i] = {
               chave: pet._id,
               nome: pet.nome
            };
         }
      } catch (exception){
         console.log(exception);
      }
   }
   res.render('petLoja', {pets: lista});
});

// roteia o blog ou blog_home
app.get('/blog(_home)?', async (req, res)=>{
   let response = "";
   couchdb.database('materias');
   let materias = (await couchGet('_all_docs')).body.rows;
   if(req.url == "/blog_home") materias = materias.slice(0, 3);
   const lista = [];
   for(let i in materias){
      try{
         let materia = (await couchGet(materias[i].key)).body;
         if(materia._id){
            lista[i] = {
               chave: materia._id,
               titulo: materia.titulo
            };
         }
      } catch (exception){
         console.log(exception);
      }
   }
   res.render('materiaBlog', {materias: lista});
});

// roteia a lista de clientes para o administrador
app.get('/listaCliente.html', async (req, res)=>{

   let response = "";
   couchdb.database('clientes');
   let clientes = (await couchGet('_all_docs')).body.rows;
   const lista = [];

   for(let i in clientes){
      try{
         let cliente = (await couchGet(clientes[i].key)).body;
         if(cliente._id){
            lista[i] = {
               nome: cliente.nome,
               chave: cliente._id
            };
         }
      } catch (exception){
         console.log(exception);
      }
   }
   res.render('listaCliente', {listaClientes: lista});
});

// roteia a lista de administradores para o administrador
app.get('/listaAdm.html', async (req, res)=>{

   let response = "";
   couchdb.database('adms');
   let adms = (await couchGet('_all_docs')).body.rows;
   const lista = [];

   for(let i in adms){
      try{
         let adm = (await couchGet(adms[i].key)).body;
         if(adm._id){
            lista[i] = {
               nome: adm.nome,
               chave: adm._id
            };
         }
      } catch (exception){
         console.log(exception);
      }
   }
   res.render('listaAdm', {listaAdms: lista});
});

// roteia a cadastrarCliente.html
app.post('/cadastrarCliente.html', (req, res)=>{
   res.sendFile(__dirname + "/cadastrarCliente.html");
});

// roteia a cadastrarAdm.html
app.post('/cadastrarAdm.html', (req, res)=>{
   res.sendFile(__dirname + "/cadastrarAdm.html");
});

// roteia o cadastrarCliente para cadastrar o cliente no banco
app.put(/\/clientes\/.*/, JSONParser, async (req, res)=>{
   couchdb.database('clientes');
   const resposta = (await couchPut(req.body.login, req.body)).body;

   res.send(resposta);
});

// roteia o cadastrarAdm para cadastrar o administrador no banco
app.put(/\/adms\/.*/, JSONParser, async (req, res)=>{
   couchdb.database('adms');
   const resposta = (await couchPut(req.body.login, req.body)).body;

   res.send(resposta);
});

// roteia o cadastroClienteAdm para editar o cadastro do cliente no banco
app.post(/\/clientes\/.*/, JSONParser, async (req, res)=>{
   couchdb.database('clientes');
   const cliente = (await couchGet(req.body.login)).body;
   req.body.senha = cliente.senha;
   const resposta = (await couchSave(req.body.login, req.body)).body;

   res.send(resposta);
});

// roteia o cadastroAdm para editar o cadastro do administrador no banco
app.post(/\/adms\/.*/, JSONParser, async (req, res)=>{console.log("salvar adm");
   couchdb.database('adms');
   const adm = (await couchGet(req.body.login)).body;
   req.body.senha = adm.senha;
   const resposta = (await couchSave(req.body.login, req.body)).body;

   res.send(resposta);
});

// roteia o cadastroClienteAdm para remover o cliente do banco
app.delete(/\/clientes\/.*/, async (req, res)=>{
   couchdb.database('clientes');
   var id = req.url.split("/");
   const resposta = (await couchDelete(id[id.length-1])).body;

   res.send(resposta);
});

// roteia o cadastroAdm para remover o administrador do banco
app.delete(/\/adms\/.*/, async (req, res)=>{
   couchdb.database('adms');
   var id = req.url.split("/");
   const resposta = (await couchDelete(id[id.length-1])).body;

   res.send(resposta);
});

// roteia o cadastroClienteAdm.html
app.post('/cadastroClienteAdm.html', JSONParser, async (req, res)=>{
   couchdb.database('clientes');
   const cliente = (await couchGet(req.body.chave2)).body;

   if(cliente){
      res.render("cadastroClienteAdm", {c: cliente});
   }
   else{
      res.send("Erro, usuário não encontrado.");
   }
});

// cria o servidor
const server = app.listen(8081, ()=>{
   let host = server.address().address
   let port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});

// funcao para buscar um produto, ainda não sabemos se será necessária
const buscarProduto = (id) => {
   return new Promise( (resolve, reject) => {
      const xhttp = new xmlHTTPResponse();
      xhttp.onreadystatechange = () => {
         if(xhhttp.readyState == 4){
            if(xhttp.status == 200){
               let response = "<figure class='loja' onClick=\"alterarPagina(\'produto\', \'" + xhttp.responseText;console.log(Object.getOwnPropertyNames(xhttp));
               resolve(xhttp.responseText);
            }
         }
      };
      xhttp.open('GET', 'localhost:5984/' + id, true);
   });
};
