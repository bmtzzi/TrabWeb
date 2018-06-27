const fs = require('fs');
//const util = require('util');
//const readFile = util.promisify(fs.readFile);
const express = require('express');
const app = express();

app.use(express.static('site/public'));

app.get('/', (req, res)=>{
//   let arquivo = await readFile("site/index.html", "utf8");
//   console.log(arquivo);
   res.sendFile(__dirname + "/index.html");
})

const server = app.listen(8081, ()=>{
   let host = server.address().address
   let port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
