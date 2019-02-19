//------------------------------------------Inserindo placar e opção para remover linha

function inserePlacar() {

	var corpoTabela = $(".placar").find("tbody"); //o método find encontra tags dentro de um locol determinado. Neste caso a class placar
	var usuario = "Tássio";
	var numPalavras = $("#contador-palavras").text();


//Criando uma tag HTML dentro de uma variável
	var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha); //atrelando botao-remover ao event click para chamar a função removerLinha

	
	//corpoTabela.append(linha); //essa função inserer uma variavel dentro e no final de uma tag HTML			 
	corpoTabela.prepend(linha); //essa função inserer uma variavel dentro e no começo (pré) de uma tag HTML			 
}


//inserindo nova linha. Criando tag HTML a partir de um objeto jQuery:
function novaLinha(usuario,palavras){
//para novos usuarios, é necessários criaar os elementos dentro da tabela. 
//E já garantindo que os eventos necessários iniciarão junto aos elementos.

    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario); //criando e adicionando a variavel usuario
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover"); //criando a tag já com atributos e classes
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete"); //criando a tag já com classes e textos

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha; //retornando o objeto
}

//opções de deletar placar:
function removeLinha(event){
	event.preventDefault();
    $(this).parent().parent().remove(); //para usar as funcionalidades do jQuery nos elemtos do JS.... 
    //observe também que, neste caso, estamos acessando o pai do pai (avo) do elemento this (que é um td, neste caso)
}
