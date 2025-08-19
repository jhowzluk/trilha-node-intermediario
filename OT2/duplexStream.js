const { Duplex } = require('stream');

class MyDuplex extends Duplex {
    constructor(options) {
        super(options)
        this.bufffer = [];
        this.processing = false;
    }

    _write(chunk, encoding, callback) {

        const transformedChunk = chunk.toString().toUpperCase()
        console.log(`[_write] Recebido: '<span class="math-inline">\{chunk\.toString\(\)\}' \-\> Transformado\: '</span>{transformedChunk}'`);

        this.push(transformedChunk);
        callback();
    }

    _read(size){
        if(!this.processing){

        }
    }
}

const duplex = new MyDuplex();

let chunksLidos = [];

duplex.on('data', (chunk) => {
    console.log(`[onData] Lido (transformado): '${chunk.toString()}'`);
    chunksLidos.push(chunk.toString());
});

duplex.on('end', () => {
    console.log('--- Fim da leitura do Duplex Stream ---');
    console.log('Todos os chunks transformados:', chunksLidos.join(' '));
});

console.log('Escrevendo "olá" no stream...');
duplex.write('olá');

console.log('Escrevendo "mundo" no stream...');
duplex.write('mundo');

console.log('Finalizando a escrita no stream...');
duplex.end();