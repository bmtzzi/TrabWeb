let produto = undefined;
let db = undefined;

codigoProdutoValido = (string, campoDeSaidaErro) => {
	string = parseFloat(string);

	if(isNaN(string)){
		campoDeSaidaErro.innerHTML = ("<h1>Escreva o código do produto a ser buscado</h1>");
		return false;
	}
	return true;
}

diminuirEstoque = () => {
	let saida = document.getElementById("descricaoProduto");

	var objectStore = db.transaction("produto", "readwrite").objectStore("produto");

	produto.quantidadeEstoque -= 1;
	produto.quantidadeVendida += 1;
	var requestUpdate = objectStore.put(produto);
	requestUpdate.onerror = erro => {
		saida.innerHTML = ("<h1>Erro ao tentar atualizar o produto, erro no log do console.");
		console.log(erro);
	}
	requestUpdate.onsuccess = sucesso => {
		saida.innerHTML = ("<h1>" + produto.nome + " " + produto.marca + "</h1><h2>Preço = " + produto.preco + "</h2><h2>" + produto.descricao + "</h2><h2>Estoque = " + produto.quantidadeEstoque + "</h2><h2>Vendidos = " + produto.quantidadeVendida + "</h2><image src='" + produto.foto + "' alt='imagem que faz alusão a" + produto.nome + " " + produto.marca + "'/>");
	}
	document.getElementById("escondivel").hide();
}

aumentarEstoque = () => {
	const saida = document.getElementById("descricaoProduto");

	var objectStore = db.transaction("produto", "readwrite").objectStore("produto");

	produto.quantidadeEstoque += 1;
	var requestUpdate = objectStore.put(produto);
	requestUpdate.onerror = erro => {
		saida.innerHTML = ("<h1>Erro ao tentar atualizar o produto, erro no log do console.");
		console.log(erro);
	}
	requestUpdate.onsuccess = sucesso => {
		saida.innerHTML = ("<h1>" + produto.nome + " " + produto.marca + "</h1><h2>Preço = " + produto.preco + "</h2><h2>" + produto.descricao + "</h2><h2>Estoque = " + produto.quantidadeEstoque + "</h2><h2>Vendidos = " + produto.quantidadeVendida + "</h2><image src='" + produto.foto + "' alt='imagem que faz alusão a" + produto.nome + " " + produto.marca + "'/>");
	}
}

buscarProduto = () => {
	const openRequest = window.indexedDB.open("simulacao_servidor_db", 1);

	openRequest.onsuccess = function(e) {
		db = e.target.result;

		const tabelaProduto = db.transaction("produto").objectStore("produto");

		const cod = document.getElementById("nomeProduto").value;
		const saida = document.getElementById("descricaoProduto");

		if(codigoProdutoValido(cod, saida)){
//			var request = tabelaProduto.get(parseFloat(document.getElementById("nomeProduto").value));
			const request = tabelaProduto.openCursor(parseFloat(document.getElementById("nomeProduto").value));
//			var request = tabelaProduto.openCursor(1101);


			request.onerror = (event) => {
				console.log("produto não encontrado");
			}
			request.onsuccess = (event) => {
				console.log(request);
				if(request.result){
					produto = request.result.value
					saida.innerHTML = ("<h1>" + produto.nome + " " + produto.marca + "</h1><h2>Preço = " + produto.preco + "</h2><h2>" + produto.descricao + "</h2><h2>Estoque = " + produto.quantidadeEstoque + "</h2><h2>Vendidos = " + produto.quantidadeVendida + "</h2><image src='" + produto.foto + "' alt='imagem que faz alusão a'" + produto.nome + " " + produto.marca + "'/>");
				}
				else{
					saida.innerHTML = ("<h1>Código " + cod +" inexistente no banco de dados.</h1>");
				}
			}
		}
	}
}

if("indexedDB" in window){
	// trabalha com o banco de dados
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	const openRequest = indexedDB.open("simulacao_servidor_db", 1);

	openRequest.onupgradeneeded = (e) =>{
		console.log("Atualizando a base de dados...");

		db = e.target.result;

		if(e.oldVersion < 1){
			// cria o object store e define os indices
			//produtos
			const produtosPadrao = [
						{cod : 1101, nome : "Ração para gato", tipo: "gato", descricao : "Deixa seu gatinho bem alimentado!", preco : 15.05, marca : "Golden", quantidadeEstoque : 50, quantidadeVendida : 10, foto : "Imagens/racao_golden_gatos_castrados_carne.png"},
						{cod : 1202, nome : "Ração para cachorro", tipo: "cachorro", descricao : "Deixa seu cachorrinho bem alimentado!", preco : 19.09, marca : "Pedigree", quantidadeEstoque : 40, quantidadeVendida : 40, foto : "Imagens/pedigree-adulto-carne-e-vegetais-pacote-1-kg_200x200-PU5f8da_1.jpg"},
						{cod : 1303, nome : "Ração para pássaro", tipo: "pássaro", descricao : "Deixa seu passarinho bem alimentado!", preco : 18.08, marca : "Birdy", quantidadeEstoque : 80, quantidadeVendida : 180, foto : "Imagens/racaoPassaro.jpg"},
						{cod : 1404, nome : "Ração para lagarto", tipo: "lagarto", descricao : "Deixa seu lagartinho bem alimentado!", preco : 17.07, marca : "Lizzy", quantidadeEstoque : 100, quantidadeVendida : 30, foto : "Imagens/racaoLagarto.jpg"},
						{cod : 1505, nome : "Ração para tartaruga", tipo: "tartaruga", descricao : "Deixa sua tartaruguinha bem alimentada!", preco : 16.06, marca : "Lentinha", quantidadeEstoque : 70, quantidadeVendida : 20, foto : "Imagens/racaoTartaruga.jpg"}
						];

			//servicos
			const servicosPadrao = [
						{cod : 1202, nome : "Vacina de raiva", tipo: "veterinário", descricao : "Deixa seu cachorrinho tranquilo!", preco : 30.09, marca : "Vacina Boa", foto : "Imagens/Vacinacao-de-Animais.jpg", alt : "Imagem de um cachorro recebendo vacina"},
						{cod : 1303, nome : "Banho", tipo: "estética", descricao : "Deixa seu gatinho cheiroso!", preco : 18.08, marca : "", foto : "Imagens/banho-gato.jpg", alt : "Imagem de um gato tomando banho"}
						];

			//pets a venda
			const petsLojaPadrao = [
						{cod : 1101, nome : "Xinguin", tipo: "gato", descricao : "Carinhosa!", preco : 4000.00, idade: "1 ano e 6 meses", raca : "Vira-lata", pelagem: "curta tricolor", foto : "Imagens/xinguin.jpg"}
						];

			//materias no blog
			const blogPadrao = [
						{cod : 1101, titulo : "Nova ração chega à loja :D", foto : "Imagens/pedigree-adulto-carne-e-vegetais-pacote-1-kg_200x200-PU5f8da_1.jpg",
						conteudo: "Uma nova ração acaba de chegar em nossa loja online, estamos falando da Pedigree, é mais uma opção deliciosa e nutritiva que trazemos a você, nosso cliente, para deixar seus animais mais saudáveis. Eu sei que este texto deveria ser mais comprido para parecer uma matéria real de um blog, mas não estou com tanta criatividade assim para escrever um monte de linhas sobre 'nova ração pode ser comprada em nossa loja'."},
						{cod : 1201, titulo : "Novo gatinho chega à loja :D", foto : "Imagens/xinguin.jpg",
						conteudo: "Uma nova gatinha acaba de chegar em nossa loja online, estamos falando da Xinguin, uma gatinha tricolor linda, cheia de energia e carinho. Eu sei que este texto deveria ser mais comprido para parecer uma matéria real de um blog, mas não estou com tanta criatividade assim para escrever um monte de linhas sobre 'nova gatinha pode ser comprada em nossa loja'."}
						];

			//adiministradores
			const admPadrao = [
						{cod : 1101, nome : "Roberto Xin", telefone: "5678-1234", email : "rob.xin@gmail.com", login: "admin", senha: "admin", foto : "Imagens/adm.jpg"},
						{cod : 1102, nome : "Claudia Souza", telefone: "5578-1234", email : "claudia.souza@gmail.com", login: "claudia", senha: "claudia", foto : "Imagens/claudia.png"},
						{cod : 1103, nome : "Joaquim Soares", telefone: "5678-1233", email : "joaquim.soares@gmail.com", login: "joaquim", senha: "jojo", foto : "Imagens/joaquim.png"}
						];

			//clientes
			const clientePadrao = [
						{cod : 1101, nome : "Kleber Xin", endereco: "Rua das palmeiras, 851", telefone: "1234.5678", email : "kleber.xin@gmail.com", login: "Kleber", senha: "kleber", foto : "Imagens/cliente.jpg"},
						{cod : 1102, nome : "Joana Souza", endereco: "Rua dos Caquis, 57", telefone: "5558-1234", email : "joana.souza@gmail.com", login: "joana", senha: "joana", foto : "Imagens/joana.png"},
						{cod : 1103, nome : "Wesley Soares", endereco: "Rua do rio, 1058", telefone: "5658-1233", email : "wesley.soares@gmail.com", login: "wesley", senha: "wewe", foto : "Imagens/wesley.png"}
						];

			//pets
			const petPadrao = [
						{cod : 1101, nome : "Maya", cliente: "1101", raca: "Vira-lata", idade:"2 meses", foto : "Imagens/maya.jpg"},
						{cod : 1102, nome : "Mica", cliente: "1101", raca: "Vira-lata", idade:"8 meses", foto : "Imagens/mica.jpg"},
						{cod : 1103, nome : "Pink", cliente: "1101", raca: "Pinscher", idade:"5 meses", foto : "Imagens/pink.jpg"},
						{cod : 1104, nome : "Xinguin", cliente: "1101", raca: "Vira-lata", idade:"1 ano e 6 meses", foto : "Imagens/xinguin.jpg"}
						];

			//horarios marcados
			const agendaPadrao = [
						{cod : 1101, cliente : "1101", pet: "1101", data: "22/05/2018", hora: "10:00", servico:"1202"},
						{cod : 1102, cliente : "1101", pet: "1101", data: "22/05/2018", hora: "15:00", servico:"1303"}
						];

			let objectStore = db.createObjectStore("produto", {keyPath : "cod", autoIncrement:true});
			db.createObjectStore("servico", {keyPath : "cod", autoIncrement:true});
			db.createObjectStore("petLoja", {keyPath : "cod", autoIncrement:true});
			db.createObjectStore("blog", {keyPath : "cod", autoIncrement:true});
			db.createObjectStore("adm", {keyPath : "cod", autoIncrement:true});
			db.createObjectStore("cliente", {keyPath : "cod", autoIncrement:true});
			objectStore = db.createObjectStore("agenda", {keyPath : "cod", autoIncrement:true});
			objectStore.createIndex("data", "data", {unique: false});
			objectStore = db.createObjectStore("pet", {keyPath : "cod", autoIncrement:true});
			objectStore.createIndex("cliente", "cliente", {unique:false});
			//vai incluindo coisas no carrinho (e na tabela) conforme o cliente vai comprando
			//esvaziar quando finalizar a compra
			db.createObjectStore("carrinho", {keyPath : ["tipo", "cod"]});
			//objectStore.createIndex("nome", "nome", {unique : false});
			//objectStore.createIndex("preco", "preco", {unique : false});

			objectStore.transaction.oncomplete = function(event){
				let tabelaProdutos = db.transaction("produto", "readwrite").objectStore("produto");

				// coloca os produtos no banco de dados
				for(var i in produtosPadrao){
					tabelaProdutos.add(produtosPadrao[i]);
				}
				console.log("Produtos populado!");

				let tabelaServicos = db.transaction("servico", "readwrite").objectStore("servico");

				// coloca os servicos no banco de dados
				for(var i in servicosPadrao){
					tabelaServicos.add(servicosPadrao[i]);
				}
				console.log("Servicos populado!");

				let tabelaPets = db.transaction("petLoja", "readwrite").objectStore("petLoja");

				// coloca os pets a venda no banco de dados
				for(var i in petsLojaPadrao){
					tabelaPets.add(petsLojaPadrao[i]);
				}
				console.log("Pets populado!");

				let tabelaBlog = db.transaction("blog", "readwrite").objectStore("blog");

				// coloca os pets a venda no banco de dados
				for(var i in blogPadrao){
					tabelaBlog.add(blogPadrao[i]);
				}
				console.log("Blog populado!");

				let tabelaAdm = db.transaction("adm", "readwrite").objectStore("adm");
				// coloca os administradores no banco de dados
				for(var i in admPadrao){
					tabelaAdm.add(admPadrao[i]);
				}
				console.log("Adm populado!");

				let tabelaCliente = db.transaction("cliente", "readwrite").objectStore("cliente");
				// coloca os administradores no banco de dados
				for(var i in clientePadrao){
					tabelaCliente.add(clientePadrao[i]);
				}
				console.log("Cliente populado!");

				let tabelaAgenda = db.transaction("agenda", "readwrite").objectStore("agenda");
				// coloca os administradores no banco de dados
				for(var i in agendaPadrao){
					tabelaAgenda.add(agendaPadrao[i]);
				}
				console.log("Agenda populado!");

				let tabelaPet = db.transaction("pet", "readwrite").objectStore("pet");
				// coloca os administradores no banco de dados
				for(var i in petPadrao){
					tabelaPet.add(petPadrao[i]);
				}
				console.log("Pet populado!");

				let tabelaCarrinho = db.transaction("carrinho", "readwrite").objectStore("carrinho");
				console.log("Carrinho criado!");
			}
		}
	}

	openRequest.onsuccess = (e) => {
		console.log("Sucesso! :D");
		console.log(db);
		db = e.target.result;
		console.log(db);
	}

	openRequest.onerror = (e) => {
		console.log("Erro, alguma coisa deu errado:");
		console.dir(e);
	}
}
else{
	console.log("Não tem indexedDB... T-T");
	// trabalha com variaveis locais
}