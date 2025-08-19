const fs = require('fs');

const nomeArquivoJson = 'config.json';


const dadosDeConfiguracao = {
    appName: 'MinhaAppNode',
    version: '1.0.0',
    environment: 'development',
    settings: {
        port: 3000,
        debugMode: true,
        database: {
            host: 'localhost',
            user: 'admin',
            password: '123'
        }
    },
    isActive: true,
    features: ['auth', 'logging', 'notifications']
};

const jsonString = JSON.stringify(dadosDeConfiguracao, null, 2);

fs.writeFile(nomeArquivoJson, jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Erro ao escrever o arquivo JSON:', err.message);
        return;
    }
    console.log(`Arquivo '${nomeArquivoJson}' criado/atualizado com sucesso!`);

    fs.readFile(nomeArquivoJson, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err.message);
            return;
        }
        console.log(`\nConteúdo lido do arquivo '${nomeArquivoJson}':`);
        console.log(data);
    });
});