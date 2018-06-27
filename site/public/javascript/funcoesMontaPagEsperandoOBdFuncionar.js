let codigoProduto = undefined;

let pagina = "";

const gerarConteudo = (...fonte) => {
	let objectStore = undefined;
	pagina = "";

	if(fonte[0] == null){
		switch(fonte[1]){

			case "loja":
				objectStore = db.transaction("produto").objectStore("produto");

				objectStore.openCursor().onsuccess = (event) => {
        			let cursor = event.target.result;
					let n = 0;

					if(cursor){console.log("gerando " + cursor.value.nome);

						produto = cursor.value;

						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'produto\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='200px' height='200px'/><figcaption>" + produto.nome + " " + produto.marca + "</figcaption></figure>";

						cursor.continue();
						n++;
					}
					else{
						if(pagina != ""){console.log(document.getElementsByTagName("main")[0]);
							let sec = document.getElementById("produtos");console.log("hehehehehehe "+sec);
							if(sec){
								sec.innerHTML = pagina;
							}
						}
					}
				};
				break;

			case "servicosTodos":
				objectStore = db.transaction("servico").objectStore("servico");

				objectStore.openCursor().onsuccess = (event) => {
        				let cursor = event.target.result;
					let n = 0;

					if(cursor){console.log("gerando " + cursor.value.nome);

						produto = cursor.value;

						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'servico\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='153px' height='102px'/><br/><figcaption>" + produto.nome + " " + "</figcaption></figure>";

						cursor.continue();
						n++;
					}
					else{
						if(pagina != ""){console.log(document.getElementsByTagName("main")[0]);
							let sec = document.getElementById("servicos");console.log("hehehehehehe "+sec);
							if(sec){
								sec.innerHTML = pagina;
							}
						}
					}
				};
				break;

			case "listaAdm":
				objectStore = db.transaction("adm").objectStore("adm");
				let adminCod = document.getElementById("welcome").cod;

				objectStore.openCursor().onsuccess = (event) => {
        				let cursor = event.target.result;

					if(cursor){
						let admin = cursor.value;
						if(admin.cod != adminCod){
							pagina = pagina + "<li onClick=\"alterarPagina('cadastroAdm', " + admin.cod + ")\">" + admin.nome + "</li>";
						}

						cursor.continue();
					}
					else{
						let sec = document.getElementById("listaAdms");
						if(pagina != ""){
							if(sec){
								sec.innerHTML = pagina;
							}
						}
						else{
							sec.innerHTML = "Você ainda é o único Admin ;)";
						}
					}
				};
				break;

			case "listaCliente":
				objectStore = db.transaction("cliente").objectStore("cliente");

				objectStore.openCursor().onsuccess = (event) => {
        				let cursor = event.target.result;

					if(cursor){
						var cliente = cursor.value;
						pagina = pagina + "<li onClick=\"alterarPagina('cadastroClienteAdm', " + cliente.cod + ")\">" + cliente.nome + "</li>";

						cursor.continue();
					}
					else{
						let sec = document.getElementById("listaClientes");
						if(pagina != ""){
							if(sec){
								sec.innerHTML = pagina;
							}
						}
						else{
							sec.innerHTML = "<h4>Ainda não há clientes cadastrados T-T</h4>";
						}
					}
				};
				break;

			case "listaProduto":
				objectStore = db.transaction("produto").objectStore("produto");

				objectStore.openCursor().onsuccess = (event) => {
        				let cursor = event.target.result;

					if(cursor){
						var tupla = cursor.value;
						pagina = pagina + "<li onClick=\"alterarPagina('editarProduto', " + tupla.cod + ")\">" + tupla.nome + " " + tupla.marca + "</li>";

						cursor.continue();
					}
					else{
						let sec = document.getElementById("listaProdutos");
						if(pagina != ""){
							if(sec){
								sec.innerHTML = pagina;
							}
						}
						else{
							sec.innerHTML = "<h4>Ainda não há clientes cadastrados T-T</h4>";
						}
					}
				};
				break;

			case "listaServico":
				objectStore = db.transaction("servico").objectStore("servico");

				objectStore.openCursor().onsuccess = (event) => {
        				let cursor = event.target.result;

					if(cursor){
						var tupla = cursor.value;
						pagina = pagina + "<li onClick=\"alterarPagina('editarServico', " + tupla.cod + ")\">" + tupla.nome + "</li>";

						cursor.continue();
					}
					else{
						let sec = document.getElementById("listaServicos");
						if(pagina != ""){
							if(sec){
								sec.innerHTML = pagina;
							}
						}
						else{
							sec.innerHTML = "<h4>Ainda não há clientes cadastrados T-T</h4>";
						}
					}
				};
				break;

			case "paginaPrincipal":
				var tabelaProduto = db.transaction("produto").objectStore("produto");
			        pagina = "", produto = undefined;
			        var n1 = 0;
		
			        tabelaProduto.openCursor().onsuccess = (event) => {
		        	    var cursor = event.target.result;
			            if(cursor && n1 < 3){
			                produto = cursor.value;
			                pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'produto\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='200px' height='200px'/><figcaption>" + produto.nome + " " + produto.marca + "</figcaption></figure>";
		        	        n1++;
		                	cursor.continue();
			            }else{
			                if(pagina != ""){
			                    let sec = document.getElementById("homeProd");
		        	            if(sec){
		                	        sec.innerHTML = pagina;
			                    }
			                }
			            }
		        	};

		        
			        var tabelaServico = db.transaction("servico").objectStore("servico");
			        var paginaServ = "", servico = undefined;
			        var n2 = 0;
		
			        tabelaServico.openCursor().onsuccess = (event) => {
		        	    var cursor = event.target.result;
			            if(cursor && n2 < 3){
			                servico = cursor.value;
			                paginaServ = paginaServ + "<figure class='loja' onClick=\"alterarPagina(\'servico\', \'" + servico.cod + "\')\"><img src='" + servico.foto + "' alt='" + servico.nome + " " + servico.marca + "' width='200px' height='200px'/><figcaption>" + servico.nome + " " + servico.marca + "</figcaption></figure>";
		        	        n2++;
		                	cursor.continue();
			            }else{
			                if(paginaServ != ""){
			                    let sec = document.getElementById("homeServ");
		        	            if(sec){
		                	        sec.innerHTML = paginaServ;
			                    }
			                }
			            }
		        	};


			        var tabelaPet = db.transaction("petLoja").objectStore("petLoja");
			        var paginaPet = "", pets = undefined;
			        var n3 = 0;
		
			        tabelaPet.openCursor().onsuccess = (event) => {
		        	    var cursor = event.target.result;
			            if(cursor && n3 < 3){
			                pets = cursor.value;
			                paginaPet = paginaPet + "<figure class='loja' onClick=\"alterarPagina(\'pets\', \'" + pets.cod + "\')\"><img src='" + pets.foto + "' alt='" + pets.nome + "' width='200px' height='200px'/><figcaption>" + pets.nome + "</figcaption></figure>";
		        	        n3++;
		                	cursor.continue();
			            }else{
			                if(paginaPet != ""){
			                    let sec = document.getElementById("homePets");
		        	            if(sec){
		                	        sec.innerHTML = paginaPet;
			                    }
			                }
			            }
		        	};

			        var tabelaBlog = db.transaction("blog").objectStore("blog");
			        var paginaBlog = "", blog = undefined;
			        var n4 = 0;
		
			        tabelaBlog.openCursor().onsuccess = (event) => {
		        	    var cursor = event.target.result;
			            if(cursor && n4 < 3){
			                blog = cursor.value;
			                paginaBlog = paginaBlog + "<figure class='loja' onClick=\"alterarPagina(\'blog\', \'" + blog.cod + "\')\"><img src='" + blog.foto + "' alt='" + blog.titulo + "' width='200px' height='200px'/><figcaption>" + blog.titulo + "</figcaption></figure>";
		        	        n4++;
		                	cursor.continue();
			            }else{
			                if(paginaBlog != ""){
			                    let sec = document.getElementById("homeBlog");
		        	            if(sec){
		                	        sec.innerHTML = paginaBlog;
			                    }
			                }
			            }
		        	};
					break;

			case "petsLoja":
				var tabelaPet = db.transaction("petLoja").objectStore("petLoja");
			        var paginaPet = "", pets = undefined;
		
			        tabelaPet.openCursor().onsuccess = (event) => {
			            var cursor = event.target.result;
		        	    if(cursor){
		                	pets = cursor.value;
			                paginaPet = paginaPet + "<figure class='loja' onClick=\"alterarPagina(\'pet\', \'" + pets.cod + "\')\"><img src='" + pets.foto + "' alt='" + pets.nome + "' width='200px' height='200px'/><figcaption>" + pets.nome + "</figcaption></figure>";
			                cursor.continue();
			            }else{
		        	        if(paginaPet != ""){
		                	    let sec = document.getElementById("petsLoja");
			                    if(sec){
			                        sec.innerHTML = paginaPet;
			                    }
		        	        }
			            }
			        };
				break;

			case "blog":
				var tabelaBlog = db.transaction("blog").objectStore("blog");
			        var paginaBlog = "", blog = undefined;
		
			        tabelaBlog.openCursor().onsuccess = (event) => {
			            var cursor = event.target.result;
		        	    if(cursor){
		                	blog = cursor.value;
			                paginaBlog = paginaBlog + "<section onClick=\"alterarPagina(\'materia\', \'" + blog.cod + "\')\"class='materia' style='display: inline-block;text-align:center;margin: 15px 20px;'>" + 
		                	"<figure class='figuraMateria'><img src='" + blog.foto + "' alt='" + blog.titulo + "' width='200px' height='200px'/><figcaption>" + blog.titulo + "</figcaption></figure></section>";
			                cursor.continue();
			            }else{
			                if(paginaBlog != ""){
			                    let sec = document.getElementById("blog");
			                    if(sec){
			                        sec.innerHTML = paginaBlog;
		        	            }
		                	}
			            }
			        };
				break;
			case "carrinho":
				let transacao = db.transaction(["carrinho", "produto", "servico", "petLoja"]);
				let tabelaCarrinho = transacao.objectStore("carrinho");
				tabelaProduto = transacao.objectStore("produto");
				tabelaServico = transacao.objectStore("servico");
				tabelaPet = transacao.objectStore("petLoja");
				let paginaCarrinho = "";
			        let welcome = document.getElementById("welcome");
				let itemCarrinho = undefined;
				let total = 0.0;
			        let n = 0;

			        if(welcome){
			    	    var cliente = document.getElementById("welcome").cod;
			        }
				else{
				    cliente = null;
				}

			        tabelaCarrinho.openCursor().onsuccess = (event) => {
			            var cursor = event.target.result;

			            if(cursor){
		        	        itemCarrinho = cursor.value;
					if(itemCarrinho.cliente == cliente || itemCarrinho.cliente == null){
						let request = undefined;console.log(parseInt(itemCarrinho.cod));
						switch(itemCarrinho.tipo){
							case "produto":
								request = tabelaProduto.get(parseInt(itemCarrinho.cod));
								break;
							case "servico":
								request = tabelaServico.get(parseInt(itemCarrinho.cod));
								break;
							case "pet":
								request = tabelaPet.get(parseInt(itemCarrinho.cod));
								break;
						}
						request.onsuccess = (e) => {
							let item = request.result;console.log(request);console.log(item);
							total += item.preco;
							if(n == 1){
								paginaCarrinho = paginaCarrinho + "<li class='outroItemCarrinho'>";
							}
							else{
								paginaCarrinho = paginaCarrinho + "<li class='primeiroItemCarrinho'>";
								n = 1;
							}
							switch(itemCarrinho.tipo){
								case "produto":
									paginaCarrinho = paginaCarrinho + "<img src='" + item.foto + "' alt='" + item.nome + " " + item.marca + "' width='30px' height='auto' style='float:left;'/><h4 class='nomeProdutoCarrinho'>" + item.nome + " " + item.marca;
									break;
								case "servico":
									paginaCarrinho = paginaCarrinho + "<img src='" + item.foto + "' alt='" + item.nome + "' width='30px' height='auto' style='float:left;'/><h4 class='nomeProdutoCarrinho'>" + item.nome;
									break;
								case "pet":
									paginaCarrinho = paginaCarrinho + "<img src='" + item.foto + "' alt='" + item.tipo + " " + item.raca + "' width='30px' height='auto' style='float:left;'/><h4 class='nomeProdutoCarrinho'>" + item.tipo + " " + item.raca;
									break;
							}
							paginaCarrinho = paginaCarrinho + "</h4><input class='inputQtdCarrinho' type='number' value='1' min='0' maxlength='2'><h4 class='precoProdutoCarrinho'>R$ " + item.preco + "</h4></li>";
						}
					}
			                cursor.continue();
			            }else{
			                if(paginaCarrinho != ""){
					    paginaCarrinho = "<li style='margin-left: 55px;'><h3 class='legendaCarrinho'>Produto</h3><h3 style='display: inline;margin-left: 31.3%;'>Quantidade</h3><h3 style='float: right;'>Valor</h3>" + paginaCarrinho;
					    let sec = document.getElementById("listaCarrinho");
		                	    if(sec){
		                        	sec.innerHTML = paginaCarrinho;
			                    }
					    document.getElementById("total").innerHTML = "Total R$ " + total;
			                }
					else{
						document.getElementsByTagName("main")[0].innerHTML = "<h3 style='text-align: center;'>Seu carrinho ainda está vazio... T-T</h3>";
					}
			            }
		        	};
				break;
			case "agendamento":
				let transacaoAgenda = db.transaction(["cliente", "pet", "servico"]);
				tabelaCliente = transacaoAgenda.objectStore("cliente");
				tabelaPet = transacaoAgenda.objectStore("pet");
				tabelaServico = transacaoAgenda.objectStore("servico");
				let paginaAgendamento = "";
				let data = (new Date()).toISOString().slice(0, 10);
				document.getElementById("agendamentoData").value = data;
				document.getElementById("agendamentoData").min = data;
			        let clienteCod = document.getElementById("welcome").cod;
				let itemPet = undefined;
				let continua = true;

			        tabelaPet.openCursor().onsuccess = (event) => {
			            var cursor = event.target.result;

			            if(cursor){
		        	        itemPet = cursor.value;
					if(itemPet.cliente == clienteCod){console.log(itemPet.nome);
						paginaAgendamento = paginaAgendamento + "<option value='" + itemPet.nome + "'>" + itemPet.nome + "</option>";
					}
			                cursor.continue();
			            }else{
			                if(paginaAgendamento != ""){
					    paginaAgendamento = "<option value='none'></option>" + paginaAgendamento;
					    let sec = document.getElementById("agendamentoPet");
		                	    if(sec){console.log(paginaAgendamento);
		                        	sec.innerHTML = paginaAgendamento;
			                    }
					    let itemServico = undefined;
					    paginaAgendamento = "";
		    			        tabelaServico.openCursor().onsuccess = (event) => {
					            var cursor = event.target.result;

					            if(cursor){
				        	        itemServico = cursor.value;
							paginaAgendamento = paginaAgendamento + "<option value='" + itemServico.nome + "'>" + itemServico.nome + "</option>";
					                cursor.continue();
					            }else{
				                	if(paginaAgendamento != ""){
							    paginaAgendamento = "<option value='none'></option>" + paginaAgendamento;
							    let sec = document.getElementById("agendamentoServico");
			                		    if(sec){
				                        	sec.innerHTML = paginaAgendamento;
				                	    }
//							    gerarConteudo("agendaDoDia");
							}
							else{
							    document.getElementById("secaoAgendamento").innerHTML = "<h3 style='text-align: center;'>Não há serviços disponíveis no momento.</h3>";
							    continua = false;
							}
			            		    }
			        	        };
			                }
					else{
						document.getElementById("secaoAgendamento").innerHTML = "<h3 style='text-align: center;'>Você ainda não possui Pets.</h3>";
						continua = false;
					}
			            }
		        	};
//				if(!continua){
					break;
//				}
			case "agendaDoDia":
				let transacaoDia = db.transaction(["agenda", "servico", "pet"]);
				let tabelaAgenda = transacaoDia.objectStore("agenda");
				tabelaServico = transacaoDia.objectStore("servico");
				tabelaPet = transacaoDia.objectStore("pet");
				paginaAgendamento = "";
			        clienteCod = document.getElementById("welcome").cod;
				itemAgenda = undefined;
				let dataInput = document.getElementById("agendamentoData").value;
				let horaAtual = (new Date()).getHours();
				let chavePesquisa = IDBKeyRange.only(dataInput);
				let horarios = [];

			        let request = tabelaAgenda.index("data").openCursor(chavePesquisa);
				request.onsuccess = (event) => {
			            var cursor = event.target.result;

			            if(cursor){
		        	        itemAgenda = cursor.value;console.log(itemAgenda.data);
					if(itemAgenda.data == dataInput){// ainda tem que testar se precisa desse if usando o log acima
						if(dataInput == (new Date()).toISOString().slice(0, 10)){
							let hora = parseInt(itemAgenda.hora.slice(0, 1));
							let requestServico = tabelaServico.get(parseInt(itemAgenda.servico));
							requestServico.onsuccess = (e) => {
								let servicoAgendado = requestServico.result;
								let requestPet = tabelaPet.get(parseInt(itemAgenda.pet));
								requestPet.onsuccess = (e) => {
									let petAgendado = requestPet.result;

									horarios[hora] = "<input type='radio' name='horarioAgendamento' value='" + itemAgenda.hora + "' disabled/>" + itemAgenda.hora + "<br /><img src='" + servicoAgendado.foto + " alt='" + servicoAgendado.alt + " width='20px' height='auto'/>" + servicoAgendado.nome + ", " + petAgendado.nome;
								};

								var i;
								for(i = 8; i < horaAtual - 1; i++){
									if(!horarios[i]){
										horarios[hora] = "<input type='radio' name='horarioAgendamento' value='" + itemAgenda.hora + "' disabled/>" + itemAgenda.hora + "<br />";
									}
								}
								for(i = horaAtual; i < 19; i++){
									if(!horarios[i]){
										horarios[hora] = "<input type='radio' name='horarioAgendamento' value='" + itemAgenda.hora + "'/>" + itemAgenda.hora + "<br />";
									}
								}
							};
						}
						else{
							let i;
							for(i = 8; i < 19; i++){
								if(hora < (horaAtual + 1)){
									horarios[hora] = "<input type='radio' name='horarioAgendamento' value='" + itemAgenda.hora + "' disabled/>" + itemAgenda.hora + "<br />";
								}
								else{
									horarios[hora] = "<input type='radio' name='horarioAgendamento' value='" + itemAgenda.hora + "'/>" + itemAgenda.hora + "<br />";
								}
							}
						}
						switch(itemCarrinho.tipo){
							case "produto":
								request = tabelaProduto.get(parseInt(itemCarrinho.cod));
								break;
							case "servico":
								request = tabelaServico.get(parseInt(itemCarrinho.cod));
								break;
							case "pet":
								request = tabelaPet.get(parseInt(itemCarrinho.cod));
								break;
						}
						request.onsuccess = (e) => {
							let item = request.result;console.log(request);console.log(item);
							total += item.preco;
							if(n == 1){
								paginaCarrinho = paginaCarrinho + "<li class='outroItemCarrinho'>";
							}
							else{
								paginaCarrinho = paginaCarrinho + "<li class='primeiroItemCarrinho'>";
								n = 1;
							}
							switch(itemCarrinho.tipo){
								case "produto":
									paginaCarrinho = paginaCarrinho + "<img src='" + item.foto + "' alt='" + item.nome + " " + item.marca + "' width='30px' height='auto' style='float:left;'/><h4 class='nomeProdutoCarrinho'>" + item.nome + " " + item.marca;
									break;
								case "servico":
									paginaCarrinho = paginaCarrinho + "<img src='" + item.foto + "' alt='" + item.nome + "' width='30px' height='auto' style='float:left;'/><h4 class='nomeProdutoCarrinho'>" + item.nome;
									break;
								case "pet":
									paginaCarrinho = paginaCarrinho + "<img src='" + item.foto + "' alt='" + item.tipo + " " + item.raca + "' width='30px' height='auto' style='float:left;'/><h4 class='nomeProdutoCarrinho'>" + item.tipo + " " + item.raca;
									break;
							}
							paginaCarrinho = paginaCarrinho + "</h4><input class='inputQtdCarrinho' type='number' value='1' min='0' maxlength='2'><h4 class='precoProdutoCarrinho'>R$ " + item.preco + "</h4></li>";
						}
					}
			                cursor.continue();
			            }else{
			                if(paginaCarrinho != ""){
					    paginaCarrinho = paginaCarrinho = "<li style='margin-left: 55px;'><h3 class='legendaCarrinho'>Produto</h3><h3 style='display: inline;margin-left: 31.3%;'>Quantidade</h3><h3 style='float: right;'>Valor</h3>" + paginaCarrinho;
					    let sec = document.getElementById("listaCarrinho");
		                	    if(sec){
		                        	sec.innerHTML = paginaCarrinho;
			                    }
					    document.getElementById("total").innerHTML = total;
			                }
					else{
						document.getElementsByTagName("main")[0].innerHTML = "<h3 style='text-align: center;'>Seu carrinho ainda está vazio... T-T</h3>";
					}
			            }
		        	};
				break;
		}
	}
	else{
		switch(fonte[1]){
			case "produto":
				objectStore = db.transaction("produto").objectStore("produto");

				var request = objectStore.get(parseInt(fonte[0]));

				request.onsuccess = (e) => {
					let produto = request.result;console.log(request);
					let foto = document.getElementById("produtoImagem");
					foto.src = produto.foto;
					foto.alt = produto.nome + " " + produto.marca;
					document.getElementById("nomeMarca").innerHTML = produto.nome + " " + produto.marca;
					document.getElementById("descricao").innerHTML = produto.descricao;
					document.getElementById("preco").innerHTML = produto.preco;
					document.getElementById("comprar").cod = produto.cod;
				}
				break;

			case "servico":
				objectStore = db.transaction("servico").objectStore("servico");

				request = objectStore.get(parseInt(fonte[0]));

				request.onsuccess = (e) => {
					let produto = request.result;
					let foto = document.getElementById("servicoImagem");
					foto.src = produto.foto;
					foto.alt = produto.nome;
					document.getElementById("servicoNome").innerHTML = produto.nome;
					document.getElementById("descricao").innerHTML = produto.descricao;
					document.getElementById("preco").innerHTML = produto.preco;
					document.getElementById("comprar").cod = produto.cod;
				}
				break;

			case "pet":
				objectStore = db.transaction("petLoja").objectStore("petLoja");

				request = objectStore.get(parseInt(fonte[0]));

				request.onsuccess = (e) => {
					let produto = request.result;
					let foto = document.getElementById("petImagem");
					foto.src = produto.foto;
					foto.alt = produto.nome;
					document.getElementById("petNome").innerHTML = produto.nome;
					document.getElementById("precoPet").innerHTML = produto.preco;
					document.getElementById("carac").innerHTML = produto.descricao;
					document.getElementById("idade").innerHTML = produto.idade;
					document.getElementById("raca").innerHTML = produto.raca;
					document.getElementById("pelagem").innerHTML = produto.pelagem;
					document.getElementById("comprar").cod = produto.cod;
				}
				break;

			case "materia":
				objectStore = db.transaction("blog").objectStore("blog");

				request = objectStore.get(parseInt(fonte[0]));

				request.onsuccess = (e) => {
					let produto = request.result;
					let foto = document.getElementById("blogImagem");
					foto.src = produto.foto;
					foto.alt = produto.nome;
					document.getElementById("tituloMateria").innerHTML = produto.titulo;
					document.getElementById("textoMateria").innerHTML = produto.conteudo;
					codigoProduto = fonte[0];
				}
				break;

			case "cadastroCliente":
				objectStore = db.transaction("cliente").objectStore("cliente");

				objectStore.get(parseInt(fonte[0])).onsuccess = (event) => {
        				let cliente = event.target.result;

					document.getElementById("imagemCadastro").src = cliente.foto;
					document.getElementById("nomeCliente").value = cliente.nome;
					document.getElementById("enderecoCliente").value = cliente.endereco;
					document.getElementById("telefoneCliente").value = cliente.telefone;
					document.getElementById("emailCliente").value = cliente.email;
					document.getElementById("salvar").cod = cliente.cod;
					if(fonte[2]){
						document.getElementById("remover").cod = cliente.cod;
					}
				};
				break;

			case "cadastroAdm":
				objectStore = db.transaction("adm").objectStore("adm");

				objectStore.get(parseInt(fonte[0])).onsuccess = (event) => {
        				let adm = event.target.result;

					if(fonte[0] == document.getElementById("welcome").cod){
						document.getElementById("remover").style.display = "none";
					}

					document.getElementById("imagemCadastro").src = adm.foto;
					document.getElementById("nomeAdm").value = adm.nome;
					document.getElementById("telefoneAdm").value = adm.telefone;
					document.getElementById("emailAdm").value = adm.email;
					document.getElementById("remover").cod = adm.cod;
					document.getElementById("salvar").cod = adm.cod;
					if(document.getElementById("welcome").cod == adm.cod){
						document.getElementById("voltar").style.display = "none";
					}
				};
				break;

			case "editarProduto":
				objectStore = db.transaction("produto").objectStore("produto");

				objectStore.get(parseInt(fonte[0])).onsuccess = (event) => {
        				let tupla = event.target.result;

					document.getElementById("imagemCadastro").src = tupla.foto;
					document.getElementById("nomeProduto").value = tupla.nome;
					document.getElementById("marcaProduto").value = tupla.marca;
					document.getElementById("descricaoProduto").value = tupla.descricao;
					document.getElementById("tipoProduto").value = tupla.tipo;
					document.getElementById("precoProduto").value = tupla.preco
					document.getElementById("qtdEstoque").value = tupla.quantidadeEstoque;
					document.getElementById("qtdVendida").value = tupla.quantidadeVendida;
					document.getElementById("remover").cod = tupla.cod;
					document.getElementById("salvar").cod = tupla.cod;
				};
				break;

			case "meusPets":
				objectStore = db.transaction("pet").objectStore("pet");

				objectStore.openCursor().onsuccess = (event) => {
        				let cursor = event.target.result;

					if(cursor){console.log("gerando " + cursor.value.nome);
						let pet = cursor.value;
						if(pet.cliente == fonte[0]){
							pagina = pagina + "<li onClick=\"alterarPagina(\'meuPet\', \'" + pet.cod + "\')\">" + pet.nome + "</li>";
						}
						cursor.continue();
					}
					else{
						if(pagina != ""){console.log(document.getElementsByTagName("main")[0]);
							let sec = document.getElementById("listaMeusPets");console.log("hehehehehehe "+sec);
							if(sec){
								sec.innerHTML = pagina;
							}
						}
						else{
							document.getElementById("listaMeusPets").innerHTML = "<h3>Você não possui Pets ainda.</h3>";
						}
					}
				};
				break;

			case "meuAgendamento":console.log("entrou no meuAgendamento");
				let transacao = db.transaction(["pet", "agenda"]);
				let petBD = transacao.objectStore("pet");
				let agendaBD = transacao.objectStore("agenda");

				agendaBD.openCursor().onsuccess = (event) => {
        				let cursor = event.target.result;

					if(cursor){console.log("gerando " + cursor.value.nome);
						let compromisso = cursor.value;
						if(compromisso.cliente == fonte[0]){
							petBD.get(parseInt(compromisso.pet)).onsuccess = (e) => {console.log(e);
								let pet = e.target.result;
								pagina = pagina + "<li onClick=\"alterarPagina(\'compromissoAgendado\', \'" + compromisso.cod + "\')\">" + compromisso.data + ", " + compromisso.hora + " - " + compromisso.servico + ", " + pet.nome + "</li>";
							}
						}
						cursor.continue();
					}
					else{
						if(pagina != ""){console.log(document.getElementsByTagName("main")[0]);
							let sec = document.getElementById("listaMeusAgendamentos");console.log("hehehehehehe "+sec);
							if(sec){
								sec.innerHTML = pagina;
							}
						}
						else{
							document.getElementById("listaMeusAgendamentos").innerHTML = "<h3>Você não possui Agendamentos ainda.</h3>";
						}
					}
				};
		}
	}
};

const buscarProdutos = (tipo) => {
	var tabelaProduto = db.transaction("produto").objectStore("produto");
	pagina = "";

	tabelaProduto.openCursor().onsuccess = (event) => {
		var cursor = event.target.result;

		if(cursor){

			produto = cursor.value;
			var ativo = document.getElementsByClassName("active");
			for(i = 1; i < ativo.length; i++){
				if(ativo[i].className == "active"){
					ativo[i].className = undefined;
					break;
				}
			}
	
			switch(tipo){
				case "gato":
					if(produto.tipo == "gato"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'produto\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='200px' height='200px'/><figcaption>" + produto.nome + " " + produto.marca + "</figcaption></figure>";
					}
					break;

				case "cachorro":
					if(produto.tipo == "cachorro"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'produto\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='200px' height='200px'/><figcaption>" + produto.nome + " " + produto.marca + "</figcaption></figure>";
					}
					break;

				case "outros":
					if(produto.tipo != "gato" && produto.tipo != "cachorro"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'produto\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='200px' height='200px'/><figcaption>" + produto.nome + " " + produto.marca + "</figcaption></figure>";
					}
					break;
			}

			cursor.continue();
		}
		else{
			if(pagina != ""){
				let sec = document.getElementById("produtos");
				switch(tipo){
					case "gato":
						document.getElementById("prodGato").className = "active";
						break;

					case "cachorro":
						document.getElementById("prodCachorro").className = "active";
						break;

					case "outros":
						document.getElementById("prodOutros").className = "active";
						break;
				}
				if(sec){
					sec.innerHTML = pagina;
				}
			} else{
				let sec = document.getElementById("produtos");
				if(sec){
					sec.innerHTML = "Não existem produtos nessa categoria";
				}
			}
		}
	};
}

const buscarServico = (tipo) => {
	var tabelaServico = db.transaction("servico").objectStore("servico");
	pagina = ""; produto = undefined;

	tabelaServico.openCursor().onsuccess = (event) => {
		var cursor = event.target.result;

		if(cursor){

			produto = cursor.value;
			var ativo = document.getElementsByClassName("active");
			for(i = 1; i < ativo.length; i++){
				if(ativo[i].className == "active"){
					ativo[i].className = undefined;
					break;
				}
			}
	
			switch(tipo){
				case "estetica":
					if(produto.tipo == "estética"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'servico\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='200px' height='200px'/><figcaption>" + produto.nome + " " + produto.marca + "</figcaption></figure>";
					}
					break;

				case "veterinario":
					if(produto.tipo == "veterinário"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'servico\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + " " + produto.marca + "' width='200px' height='200px'/><figcaption>" + produto.nome + " " + produto.marca + "</figcaption></figure>";
					}
					break;
			}

			cursor.continue();
		}
		else{
			if(pagina != ""){
				let sec = document.getElementById("servicos");
				switch(tipo){
					case "estetica":
						document.getElementById("servicoEstetica").className = "active";
						break;

					case "veterinario":
						document.getElementById("servicoVeterinario").className = "active";
						break;
				}
				if(sec){
					sec.innerHTML = pagina;
				}
			} else{
				let sec = document.getElementById("servicos");
				if(sec){
					sec.innerHTML = "Não existem servicos nessa categoria";
				}
			}
		}
	};
}

const buscarPetsLoja = (tipo) => {console.log("buscarpetsloja");
	var tabelaPetsLoja = db.transaction("petLoja").objectStore("petLoja");
	pagina = ""; produto = undefined;

	tabelaPetsLoja.openCursor().onsuccess = (event) => {
		var cursor = event.target.result;

		if(cursor){

			produto = cursor.value;
			var ativo = document.getElementsByClassName("active");
			for(i = 1; i < ativo.length; i++){
				if(ativo[i].className == "active"){
					ativo[i].className = undefined;
					break;
				}
			}
	
			switch(tipo){
				case "cachorro":
					if(produto.tipo == "cachorro"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'pet\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + "' width='200px' height='200px'/><figcaption>" + produto.nome + "</figcaption></figure>";
					}
					break;

				case "gato":
					if(produto.tipo == "gato"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'pet\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + "' width='200px' height='200px'/><figcaption>" + produto.nome + "</figcaption></figure>";
					}
					break;

				case "peixe":
					if(produto.tipo == "peixe"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'pet\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + "' width='200px' height='200px'/><figcaption>" + produto.nome + "</figcaption></figure>";
					}
					break;

				case "reptil":
					if(produto.tipo == "reptil"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'pet\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + "' width='200px' height='200px'/><figcaption>" + produto.nome + "</figcaption></figure>";
					}
					break;

				case "aves":
					if(produto.tipo == "aves"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'pet\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + "' width='200px' height='200px'/><figcaption>" + produto.nome + "</figcaption></figure>";
					}
					break;

				case "roedor":
					if(produto.tipo == "roedor"){
						pagina = pagina + "<figure class='loja' onClick=\"alterarPagina(\'pet\', \'" + produto.cod + "\')\"><img src='" + produto.foto + "' alt='" + produto.nome + "' width='200px' height='200px'/><figcaption>" + produto.nome + "</figcaption></figure>";
					}
					break;
			}

			cursor.continue();
		}
		else{
			let sec = document.getElementById("petsLoja");
			switch(tipo){
				case "cachorro":
					document.getElementById("petCachorro").className = "active";
					break;

				case "gato":
					document.getElementById("petGato").className = "active";
					break;

				case "peixe":
					document.getElementById("petPeixe").className = "active";
					break;

				case "reptil":
					document.getElementById("petReptil").className = "active";
					break;

				case "aves":
					document.getElementById("petAve").className = "active";
					break;

				case "roedor":
					document.getElementById("petRoedor").className = "active";
					break;
			}
			if(pagina != ""){
				if(sec){
					sec.innerHTML = pagina;
				}
			} else{
				if(sec){
					sec.innerHTML = "Não existem pets nessa categoria";
				}
			}
		}
	};
}