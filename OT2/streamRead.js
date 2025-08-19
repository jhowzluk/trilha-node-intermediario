const fs = require('fs');

const nomeArquivoGrande = 'grandeArquivo.txt';

const stream = fs.createReadStream(nomeArquivoGrande, { encoding: 'utf-8', highWaterMark: 1024 });

let totalChunks = 0;

stream.on('data', (chunk) => {
    totalChunks ++;
    console.log(`Chunk #${chunk} recebido.`)
}) 

stream.on('end', (chunk) => {
    console.log(`Leitura do arquivo '${nomeArquivoGrande}' concluída via Stream.`);
    console.log(`Total de chunks processados: ${totalChunks}`);
});

stream.on('error', (err) => {
    console.error('Erro ao ler o arquivo via Stream:', err.message);
});

console.log('Stream criado. Aguardando chunks...');