const couchdb = require('couchdb-request')('http://localhost:5984');
const util = require('util');
const couchGet = util.promisify(couchdb.get);
//const fs = require('fs');
//const readFile = util.promisify(fs.readFile);
const express = require('express');
const app = express();
const fbe = funcoesBackEnd = require(__dirname + '/public/javascript/funcoesBackEnd');

// usa a pasta public para disponibilizar arquivos estáticos
app.use(express.static('site/public'));

// usa pug como motor de templates
app.set('view engine', 'pug');
// informa o caminho das views pug
app.set('views', __dirname + '/templates');

// roteia o index.html
app.get(/\/$|\/(index(.html)?)$/, (req, res)=>{
//   let arquivo = await readFile("site/index.html", "utf8");
//   console.log(arquivo);
   res.sendFile(__dirname + "/index.html");
});

app.get('/index.html', (req, res)=>{
//   let arquivo = await readFile("site/index.html", "utf8");
//   console.log(arquivo);
   res.sendFile(__dirname + "/index.html");
});

app.get('/paginaPrincipal.html', (req, res)=>{
   res.render("paginaPrincipal");
});

app.get('/loja.html', (req, res)=>{
   res.sendFile(__dirname + "/loja.html");
});

app.get('/servicosTodos.html', (req, res)=>{console.log("entrou em serviços");
   res.sendFile(__dirname + "/servicosTodos.html");
});

app.get('/petsTodos.html', (req, res)=>{
   res.sendFile(__dirname + "/petsTodos.html");
});

app.get('/blog.html', (req, res)=>{
   res.sendFile(__dirname + "/blog.html");
});

app.get(/produtos\/.*\/foto/, async (req, res)=>{
//   console.log(Object.getOwnPropertyNames(req));
//   console.log(req.url);
   couchdb.database('produtos');
//   res.send(await couchGet(req.url));
//   switch(req.url)
console.log(req.url + " vai buscar produto " + (req.url.match(/\/(.*)\//)[0]).match(/\/(.*)\//)[0]);
//console.log(await couchGet(req.url.match(/\/.*\//)[1]));
});

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

const server = app.listen(8081, ()=>{
   let host = server.address().address
   let port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});

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
