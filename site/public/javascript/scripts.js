const atualizarElemento = (destino, pagina) => {
	return new Promise( (resolve, reject) => {
		if(destino){
			const xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = () => {
				if (xhttp.readyState == 4) {
					if(xhttp.status == 200){
						// Typical action to be performed when the document is ready:
						destino.innerHTML = xhttp.responseText;
						console.log("carregou " + pagina);
						resolve();
					} else{
						alert("Erro: " + xhttp.statusText + "(" + xhttp.status + ")");
					}
			    	}
			};
			xhttp.open("GET", pagina, true);
			xhttp.send();
		}
		else reject(Error("Destino invalido"));
	});
};

const atualizarElementoAutenticado = (destino, pagina, idSec) => {
	return new Promise( (resolve, reject) => {
		if(destino){
			const xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = () => {
				if (xhttp.readyState == 4) {
					if(xhttp.status == 200){
						// Typical action to be performed when the document is ready:
						destino.innerHTML = xhttp.responseText;
						console.log("carregou " + pagina);
						resolve();
					} else{
						alert("Erro1: " + xhttp.statusText + "(" + xhttp.status + ")");
					}
			    	}
			};
			xhttp.open("POST", pagina, true);
			xhttp.setRequestHeader("Content-Type", "application/json");
			xhttp.send(JSON.stringify({chave:document.getElementById('welcome').getAttribute('cod'), chave2: idSec}));
		}
		else reject(Error("Destino invalido"));
	});
};


﻿const addBanco = (banco, chave, jsonBody) => {
	return new Promise( (resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				if(xhttp.status == 200){
					resolve(xhttp.responseText);
				} else{
					reject("Erro " + xhttp.statusText + "(" + xhttp.status + ")");
				}
		    	}
		};
		xhttp.open("PUT", banco + "/" + chave, true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(jsonBody);
	});
};

const alterarBanco = (banco, chave, jsonBody) => {
	return new Promise( (resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				if(xhttp.status == 200){
					resolve(xhttp.responseText);
				} else{
					reject("Erro " + xhttp.statusText + "(" + xhttp.status + ")");
				}
		    	}
		};console.log("vai pro servidor");
		xhttp.open("POST", banco + "/" + chave, true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(jsonBody);
	});
};

const removeBanco = (banco, chave) => {
	return new Promise( (resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				if(xhttp.status == 200){
					resolve(xhttp.responseText);
				} else{
					reject("Erro " + xhttp.statusText + "(" + xhttp.status + ")");
				}
		    	}
		};
		xhttp.open("DELETE", banco + "/" + chave, true);
		xhttp.send();
	});
};


const autenticarNoBanco = (loginL, senhaL) => {
	return new Promise( (resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				if(xhttp.status == 200){
					// Typical action to be performed when the document is ready:
					console.log("autenticou " + xhttp.responseText);
					if(xhttp.responseText != ""){
						document.getElementById("navCima").innerHTML = xhttp.responseText;
						resolve(true);
					}
					else{
						reject("Usuário ou senha inválidos.");
					}
				} else{
					reject("Erro " + xhttp.statusText + "(" + xhttp.status + ")");
				}
		    	}
		};
		xhttp.open("POST", "autenticar_no_banco", true);
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.send(JSON.stringify({login:loginL, senha:senhaL}));
	});
};

const alterarPagina = (...pagina) => {
	let antigoSelecionado = document.getElementById("navLateral");
	if(antigoSelecionado){
		antigoSelecionado = antigoSelecionado.getElementsByTagName("a");
		let i;
		for(i = 0; i < antigoSelecionado.length; i++){
			if(antigoSelecionado[i].className == "active"){
				antigoSelecionado[i].className = undefined;
				break;
			}
		}
	}
	let selecionado = undefined;
	switch(String(pagina[0])) {
		case "produto":
			atualizarElemento(document.getElementsByTagName("main")[0], "produto.html").then( result => {
				gerarConteudo(pagina[1], pagina[0]);
			}, (err) => {
				alert("Erro:", err);
			});
			break;
		case "servico":
			atualizarElemento(document.getElementsByTagName("main")[0], "servico.html").then( result => {
				gerarConteudo(pagina[1], pagina[0]);
			}, (err) => {
				alert("Erro:", err);
			});
			break;
		case "pet":
			atualizarElemento(document.getElementsByTagName("main")[0], "pet.html").then( result => {
				gerarConteudo(pagina[1], pagina[0]);
			}, (err) => {
				alert("Erro:", err);
			});
			break;

		case "materia":
			atualizarElemento(document.getElementsByTagName("main")[0], "materia.html").then( result => {
				gerarConteudo(pagina[1], pagina[0]);
			}, (err) => {
				alert("Erro:", err);
			});
			break;

		case "loginRequest":
			atualizarElemento(document.getElementsByTagName("main")[0], "login.html");
			selecionado = document.getElementsByClassName("active");
			if(selecionado[0]){
				selecionado[0].className = "";
			}
			selecionado = document.getElementById("navCimaLogin");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "loginClienteSucesso":
			return atualizarElemento(document.getElementsByTagName("main")[0], "loginCliente.html");
			break;
		case "loginAdminSucesso":
			return atualizarElemento(document.getElementsByTagName("main")[0], "loginAdm.html");
			break;
		case "loja":
			atualizarElemento(document.getElementsByTagName("main")[0], "loja.html").then( result => {
				selecionado = document.getElementsByClassName("active");
				if(selecionado[0]){
					selecionado[0].className = "";
				}
				selecionado = document.getElementById("navCimaLoja");
				if(selecionado){
					selecionado.className = "active";
				}
				atualizarElemento(document.getElementById('produtos'), 'loja');
//				gerarConteudo(null, "loja");
			});
			break;
		case "servicos":
			atualizarElemento(document.getElementsByTagName("main")[0], "servicosTodos.html").then( result => {
				selecionado = document.getElementsByClassName("active");
				if(selecionado[0]){
					selecionado[0].className = "";
				}
				selecionado = document.getElementById("navCimaServicos");
				if(selecionado){
					selecionado.className = "active";
				}
				atualizarElemento(document.getElementById('servicos'), 'servicosTodos');
//				gerarConteudo(null, "servicosTodos");
			});
			break;
		case "editarProduto":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "editarProduto.html").then( result => {
				gerarConteudo(pagina[1], pagina[0]);
			});
			selecionado.className = "secCadastraCliente";
			break;
		case "pets":
			atualizarElemento(document.getElementsByTagName("main")[0], "petsTodos.html").then( result => {
				selecionado = document.getElementsByClassName("active");
				if(selecionado[0]){
					selecionado[0].className = "";
				}
				selecionado = document.getElementById("navCimaPets");
				if(selecionado){
					selecionado.className = "active";
				}
				atualizarElemento(document.getElementById('petsLoja'), 'pets_loja');
//				gerarConteudo(null, "petsLoja");
			});
			break;
		case "blog":
			atualizarElemento(document.getElementsByTagName("main")[0], "blog.html").then( result => {
				selecionado = document.getElementsByClassName("active");
				if(selecionado[0]){
					selecionado[0].className = "";
				}
				selecionado = document.getElementById("navCimaBlog");
				if(selecionado){
					selecionado.className = "active";
				}
				atualizarElemento(document.getElementById('blog'), 'blog');
//				gerarConteudo(null, "blog");
			});
			break;
		case "carrinho":
			atualizarElemento(document.getElementsByTagName("main")[0], "carrinho.html").then( result => {	
				selecionado = document.getElementsByClassName("active");
				if(selecionado[0]){
					selecionado[0].className = "";
				}
				selecionado = document.getElementById("botaoCarrinho");
				if(selecionado){
					selecionado.className = "active";
				}
				gerarConteudo(null, "carrinho");
			});
			break;
		case "paginaPrincipal":
			atualizarElemento(document.getElementsByTagName("main")[0], "paginaPrincipal.html").then( result => {
				selecionado = document.getElementsByClassName("active");
				if(selecionado[0]){
					selecionado[0].className = "";
				}console.log("bd = ---------------");console.log(db);
				atualizarElemento(document.getElementById('homeProd'), 'loja_home').then( result => {
					atualizarElemento(document.getElementById('homeServ'), 'servicosTodos_home').then(result => {
						atualizarElemento(document.getElementById('homePets'), 'pets_loja_home').then(result => {
							atualizarElemento(document.getElementById('homeBlog'), 'blog_home');
						});
					});
				});
//				gerarConteudo(null, "paginaPrincipal");
			});
			break;
		case "finalizarCompra":
			atualizarElemento(document.getElementsByTagName("main")[0], "finalizarCompra.html");
			break;
		case "cadastroCliente":
			selecionado = document.getElementById("mainCliente");
			atualizarElementoAutenticado(selecionado, "cadastroCliente.html").then( result => {
				selecionado.className = "secCadastraCliente";
				selecionado = document.getElementById("cadastroCliente");
				if(selecionado){
					selecionado.className = "active";
				}
//				if(pagina[1]){
//					gerarConteudo(pagina[1], "cadastroCliente");
//				}
//				else{
//					gerarConteudo(document.getElementById("welcome").cod, "cadastroCliente");
//				}
			});
			break;
		case "cadastroClienteAdm":
			selecionado = document.getElementById("mainAdm");
			atualizarElementoAutenticado(selecionado, "cadastroClienteAdm.html", pagina[1]).then( result => {
				selecionado.className = "secCadastraCliente";
				selecionado = document.getElementById("cadastroCliente");
				if(selecionado){
					selecionado.className = "active";
				}
			});
			break;

		case "cadastroPets":
			selecionado = document.getElementById("mainCliente");
			atualizarElemento(selecionado, "cadastroPets.html");
			selecionado.className = "secCadastraCliente";
			selecionado = document.getElementById("cadastroPet");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "meusPets":
			selecionado = document.getElementById("mainCliente");
			atualizarElemento(selecionado, "meusPets.html").then( result => {
				gerarConteudo(document.getElementById("welcome").cod, pagina[0]);
			});
			selecionado.className = "secCadastraCliente";
			selecionado = document.getElementById("meusPets");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "agendamento":
			selecionado = document.getElementById("mainCliente");
			atualizarElemento(selecionado, "agendamento.html").then( result => {
				gerarConteudo(null, pagina[0]);
			});
			selecionado.className = "secCadastraCliente";
			selecionado = document.getElementById("agendar");
			if(selecionado){
				selecionado.className = "active";
			}
			break;

		case "meuAgendamento":
			selecionado = document.getElementById("mainCliente");
			atualizarElemento(selecionado, "meuAgendamento.html").then( result => {
				gerarConteudo(document.getElementById("welcome").cod, pagina[0]);
			});
			selecionado.className = "secCadastraCliente";
			selecionado = document.getElementById("meusAgendamentos");
			if(selecionado){
				selecionado.className = "active";
			}
			break;

		case "cadastroAdm":
			selecionado = document.getElementById("mainAdm");
			atualizarElementoAutenticado(selecionado, "cadastroAdm.html", pagina[1]).then( result => {
				/*if(pagina[1]){
					gerarConteudo(pagina[1], pagina[0]);
				}
				else{
					gerarConteudo(document.getElementById("welcome").cod, pagina[0]);*/
				selecionado.className = "secCadastraCliente";
				selecionado = document.getElementById("cadastroAdm");
				
				if(selecionado){
					selecionado.className = "active";
				}
				//}
			});
			
			break;

		case "listaAdm":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "listaAdm.html");
			selecionado.className = "secCadastraCliente";
			selecionado = document.getElementById("listaAdm");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "listaCliente":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "listaCliente.html");
			selecionado.className = "secCadastraCliente";
			selecionado = document.getElementById("listaCliente");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "listaProduto":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "listaProduto.html").then( result => {
				gerarConteudo(pagina[1], pagina[0]);
			});
			selecionado.className = undefined;
			selecionado = document.getElementById("listaProduto");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "listaServico":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "listaServico.html").then( result => {
				gerarConteudo(null, pagina[0]);
			});
			selecionado.className = "secCadastraCliente";
			selecionado = document.getElementById("listaServico");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "ganhos":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "ganhos.html").then( result => {
				gerarConteudo(null, pagina[0]);
			});
			selecionado.className = undefined;
			selecionado = document.getElementById("ganhos");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "consultaAgenda":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "consultaAgenda.html");
			selecionado.className = undefined;
			selecionado = document.getElementById("consultaAgenda");
			if(selecionado){
				selecionado.className = "active";
			}
			break;
		case "cadastrarAdm":
			selecionado = document.getElementById("mainAdm");
			atualizarElementoAutenticado(selecionado, "cadastrarAdm.html");
			selecionado.className = "secCadastraCliente";
			break;
		case "cadastrarCliente":
			selecionado = document.getElementById("mainAdm");
			atualizarElementoAutenticado(selecionado, "cadastrarCliente.html");
			selecionado.className = "secCadastraCliente";
			break;
		case "cadastrarProduto":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "cadastrarProduto.html");
			selecionado.className = "secCadastraCliente";
			break;
		case "cadastrarServico":
			selecionado = document.getElementById("mainAdm");
			atualizarElemento(selecionado, "cadastrarServico.html");
			selecionado.className = "secCadastraCliente";
			break;
		default:
			alert("Página não encontrada.");
	};
};

const mostrarMateria = (materia) => {
	atualizarElemento(document.getElementsByTagName("main")[0], materia + ".html");
};


const mostrarProduto = (produto) => atualizarElemento(document.getElementsByTagName("main")[0], produto + ".html");

const autenticar = async () => {
	const login = document.getElementById("login").value;
	const senha = document.getElementById("senha").value;

	if(senha == "" || login == ""){
		const main = document.getElementsByTagName("main")[0];
		if(senha == "" && main.innerHTML.search("Senha é") == -1){
			main.innerHTML = "<h4 style='text-align:center;color:red;'>Senha é um campo obrigatório</h4>" + main.innerHTML;
		}
		if(login == "" && main.innerHTML.search("Login é") == -1){
			main.innerHTML = "<h4 style='text-align:center;color:red;'>Login é um campo obrigatório</h4>" + main.innerHTML;
		}
	}
	else{
		try{
			let cliente = (await autenticarNoBanco(login, senha));
			if(cliente){
				alterarPagina(document.getElementById('welcome').getAttribute('pagina'));
			}
		}
		catch{
			alert("Usuário ou senha incorreto.");
		}
	}
};

const sair = () => {
	alterarPagina("paginaPrincipal");
	atualizarElemento(document.getElementById("navCima"), "navCimaPadrao.html");
};

const cadastrarCliente = async () => {
	let srcFoto = await getCaminhoDoArquivo(document.getElementById("inputImagemCadastro"));
	
	let cliente = await addBanco("clientes", document.getElementById("loginCliente").value, JSON.stringify({
		nome: document.getElementById("nomeCliente").value,
		endereco: document.getElementById("enderecoCliente").value,
		telefone: document.getElementById("telefoneCliente").value,
		email: document.getElementById("emailCliente").value,
		login: document.getElementById("loginCliente").value,
		senha: document.getElementById("senhaCliente").value,
		
	}));

	if(JSON.parse(cliente).ok){
		//TODO fazer attachment da foto	usando response do addbanco	
		//foto: srcFoto
		alterarPagina("listaCliente");
		alert("Cliente cadastrado com sucesso!");
	}else{
		alert("Usuário já existe");
	}	
};

const cadastrarAdm = async () => {
	let srcFoto = await getCaminhoDoArquivo(document.getElementById("inputImagemCadastro"));
	
	let cliente = await addBanco("adms", document.getElementById("loginAdm").value, JSON.stringify({
		nome: document.getElementById("nomeAdm").value,
		telefone: document.getElementById("telefoneAdm").value,
		email: document.getElementById("emailAdm").value,
		login: document.getElementById("loginAdm").value,
		senha: document.getElementById("senhaAdm").value,
		
	}));

	if(JSON.parse(cliente).ok){
		//TODO fazer attachment da foto	usando response do addbanco	
		//foto: srcFoto
		alterarPagina("listaAdm");
		alert("Administrador cadastrado com sucesso!");
	}else{
		alert("Usuário já existe");
	}	
};

/*const removerCadastroAdm = (cod) => {
	db.transaction("adm", "readwrite").objectStore("adm").delete(cod).onsuccess = () => {
		alert("Administrador removido com sucesso");
		alterarPagina("listaAdm");
	};
};*/

const removerCadastro = async (banco, cod) => {
	var response = await removeBanco(banco, cod);
	if(banco == "clientes"){
		if(JSON.parse(response).ok){	
			alterarPagina("listaCliente");		
			alert("Cliente removido com sucesso");
		}	
	}else{
		if(banco == "adms"){
			if(JSON.parse(response).ok){	
			alterarPagina("listaAdm");		
			alert("Administrador removido com sucesso");
			}
		}else{
			alert("Algo deu errado");
		}
	}
};

const cadastrarProduto = async () => {
	let srcFoto = await getCaminhoDoArquivo(document.getElementById("inputImagemCadastro"));
	let tabelaProdutos = db.transaction("produto", "readwrite").objectStore("produto");

	tabelaProdutos.add({
			nome: document.getElementById("nomeProduto").value,
			tipo: document.getElementById("tipoProduto").value,
			descricao: document.getElementById("descricaoProduto").value,
			preco: document.getElementById("precoProduto").value,
			marca: document.getElementById("marcaProduto").value,
			quantidadeEstoque: document.getElementById("qtdProduto").value,
			quantidadeVendida: 0,
			foto: scrFoto
		}).onsuccess = () => {
			alert("Produto cadastrado com sucesso.");
			console.log("Cliente cadastrado!");
			alterarPagina("listaProduto");
		}
};
						
const cadastraServico = async () => {
	let srcFoto = await getCaminhoDoArquivo(document.getElementById("inputImagemCadastro"));
	let tabelaServicos = db.transaction("servico", "readwrite").objectStore("servico");

	tabelaServicos.add({
			nome: document.getElementById("nomeServico").value,
			tipo: document.getElementById("tipoServico").value,
			descricao: document.getElementById("descricaoServico").value,
			preco: document.getElementById("precoServico").value,
			marca: "Sem Marca",
			foto: scrFoto
		}).onsuccess = () => {
			alert("Serviço cadastrado com sucesso.");
			console.log("Servico cadastrado!");
			alterarPagina("listaServico");
		}
};

const cadastrarPet = async (cod) => {
	let srcFoto = await getCaminhoDoArquivo(document.getElementById("inputImagemCadastro"));
	let tabelaServicos = db.transaction("pet", "readwrite").objectStore("pet");
	tabelaServicos.add({
			cliente: String(document.getElementById("welcome").cod),
			foto: srcFoto,
			idade: document.getElementById("idadePet").value,
			nome: document.getElementById("nomePet").value,
			raca: document.getElementById("racaPet").value
		}).onsuccess = () => {
			alert("Pet cadastrado com sucesso.");
			console.log("Pet cadastrado!");
			alterarPagina("listaPet");
		}
};

const alterarCadastroCliente = async (banco, cod, isAdm) => {	
	let srcFoto = await getCaminhoDoArquivo(document.getElementById("inputImagemCadastro"));
	
	let cliente = await alterarBanco(banco, cod, JSON.stringify({
		nome: document.getElementById("nomeCliente").value,
		endereco: document.getElementById("enderecoCliente").value,
		telefone: document.getElementById("telefoneCliente").value,
		email: document.getElementById("emailCliente").value,
		login: cod
	}));

	if(JSON.parse(cliente).ok){
		//TODO fazer attachment da foto	usando response do addbanco	
		//foto: srcFoto
		alterarPagina("listaCliente");
		alert("Dados alterados com sucesso!");
	}else{
		alert("Algo deu errado");
	}	
};

const alterarCadastroAdm = async (banco, cod) => {console.log("vai alterar dados do admin");
	let srcFoto = await getCaminhoDoArquivo(document.getElementById("inputImagemCadastro"));
	
	let cliente = await alterarBanco(banco, cod, JSON.stringify({
		nome: document.getElementById("nomeAdm").value,
		telefone: document.getElementById("telefoneAdm").value,
		email: document.getElementById("emailAdm").value,
		login: cod
	}));

	if(JSON.parse(cliente).ok){
		//TODO fazer attachment da foto	usando response do addbanco	
		//foto: srcFoto
		alterarPagina("listaAdm");
		alert("Dados alterados com sucesso!");
	}else{
		alert("Algo deu errado");
	}
};

const getBancosCarrinho = (tipo, cod) => {
	switch(tipo){
		case "produto":
			return [db.transactions(["carrinho", "produto"])];
		case "servico":
			objectStore = db.transactions(["carrinho", "servico"]);
		case "pet":
			objectStore = db.transactions(["carrinho", "petLoja"]);
			
	}
};

const adicionarCarrinho = (t, c) => {console.log("vai adicionar " + t + " " + c + " no carrinho");
	let welcome = document.getElementById("welcome");
	if(welcome){
		db.transaction("carrinho", "readwrite").objectStore("carrinho").add({tipo: t, cod: c, cliente: parseInt(welcome.cod)});
	}
	else{
		db.transaction("carrinho", "readwrite").objectStore("carrinho").add({tipo: t, cod: c, cliente: null});
	}
};

const getCaminhoDoArquivo = (inputFiles) => {
	return new Promise((resolve, reject) => {
		if(inputFiles.files && inputFiles.files[0]){
			var reader = new FileReader();

			reader.onload = (e) => {
				resolve(e.target.result);
			};
			reader.readAsDataURL(inputFiles.files[0]);
		}
		else{
			resolve(null);
		}
	});
}

const alterouImagemCadastro = async (elemento) => {
	document.getElementById("imagemCadastro").src = await getCaminhoDoArquivo(elemento);
};

const mostraData = () => {
	console.log(document.getElementById("agendamentoData").value);
}
