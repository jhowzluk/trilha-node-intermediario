function processarDados(dados){
    if(dados == null || dados == undefined){
        console.log(`Dados recebidos são nulos`);

        debugger;
    }

    const nome = dados.nome;
    console.log(`nome: ${nome}`);
}

let usuario = {
    id: 1,
    nome: 'teste'
}

let config = null;

processarDados(usuario);

processarDados(config);

