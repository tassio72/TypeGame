
var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

//----------------------------chamando as funções depois que os elementos HTML já estiverm carregados
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
}); // esta escrita é a versão short para: $(document).ready()


//---------------------------parte acima do textarea

function atualizaTamanhoFrase() {
	var frase = $(".frase").text(); ///pegando o texto de dentro da class
	var numPalavras = frase.split(" ").length; //separando e contando as palavras usando como referencia o espaço
	var tamanhoFrase = $("#tamanho-frase"); //selecionando o ID
	tamanhoFrase.text(numPalavras); //usando a função text para inserir um valor dentro da span com ID tamanho-frase
}

//---------------------------parte abaixo do textArea

 //a função on determina eventos no jQuery.
 	//formato:
 	//variavel.on("nomeEvento", ação/função())

function inicializaContadores() {
	campo.on("input", function() { //neste caso,o evento é "input"
	    var conteudo = campo.val(); //val no jQuery == value. Isso serve para acessar o que o user input.
	    							//<> text(), que seleciona a string que está na tag

	    var qtdPalavras = conteudo.split(/\S+/).length - 1; // não sei o porquê, mas o length conta como 1, mesmo antes do usuário digitar qualquer caracter. Por isso foi neccessário o -1.
	    $("#contador-palavras").text(qtdPalavras);

	    var qtdCaracteres = conteudo.length;
	    $("#contador-caracteres").text(qtdCaracteres);
	});
}

//----------------------------controlando o tempo 

function inicializaCronometro() {
	var tempoRestante = tempoInicial; // será importante para reiniciarmos o jogo
	
	campo.one("focus", function() { //assim como on, o one fica "escutando" ações do user. Mas o one "escuta"/executa apenas umas vez
	//parametro focus: toda vez que uma região está em evidencia/foco
	$("#botao-reiniciar").attr("disabled",true); //desativando botão de reiniciar
    

	    var cronometroID = setInterval(function() { //setInterval executa uma função em um tempo determinado em milisegundos
	        tempoRestante--;					
	        $("#tempo-digitacao").text(tempoRestante);
			 
	        if (tempoRestante < 1 ) {
	          	           
	           clearInterval(cronometroID); //A função clearInterval dá um stop da setInterval
	           finalizaJogo();
	        }
	    }, 1000); //função é executada em 1000 e 1000 milisegundos ou 1 em 1 segundo
	});

}

function finalizaJogo(){
   //no jQuery, é possível manipular atributos doHTML pela função attr: variavel.attr(atributo, valor)
   //ou variavel.attr(atributo) para saber o valor que está na tag
	        
    campo.attr("disabled", true);// Para atributos que não recebem valor, como disabled, é colodado true/false como segunda parametro
	
	campo.addClass("campo-desativado"); //adicionando a uma classe do estilos.css. também é possível usar toggleClass()

	$("#botao-reiniciar").attr("disabled",false); //ativando botão reiniciar

	inserePlacar();
	
}



//----------------------------------deixando a page mais semantica

function inicializaMarcadores () {
	var frase = $(".frase").text();
	campo.on("input", function() {
	    var digitado = campo.val(); //val == value
;		
    //uma forma mais curta 
    	//startsWith é a versão curta para pegar um pedaço de uma string, usando substr, e comparar com outra string
	    var digitouCorreto = frase.startsWith(digitado); //devolve um boolean
		if(digitouCorreto) {
			campo.addClass("borda-verde");
	        campo.removeClass("borda-vermelha");
		} else {
	        campo.addClass("borda-vermelha");
	        campo.removeClass("borda-verde");
	    }

//outra forma:


	//função substr pega um pedaço de uma string: variavel.substr(valor inicial da string, valor final da string)
	    var comparavel = frase.substr(0 , digitado.length) //apenas deixei descomentado para fins didáticos

	   // if(digitado == comparavel) {
	   //     campo.addClass("borda-verde");
	   //     campo.removeClass("borda-vermelha");
	   //} else {
	   //     campo.addClass("borda-vermelha");
	   //     campo.removeClass("borda-verde");
	   //}
	});
}









//----------------------------------Reiniciar
//short code to click
$("#botao-reiniciar").click(reiniciaJogo);

function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.removeClass("campo-desativado"); //removendo a uma classe do estilos.css. Também é possível usar toggleClass()
    inicializaCronometro();
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}
